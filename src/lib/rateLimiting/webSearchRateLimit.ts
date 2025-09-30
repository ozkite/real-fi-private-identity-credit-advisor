import type { SecretVaultBuilderClient } from "@nillion/secretvaults";
import { getRecord } from "@/lib/nildb/getRecord";
import { updateRecord } from "@/lib/nildb/updateRecord";

// Rate limit configuration
export const WEB_SEARCH_DAILY_LIMIT = 20;

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Check if a date string is today
 */
export function isToday(dateString: string): boolean {
  return dateString === getTodayDateString();
}

/**
 * Check if user has reached web search rate limit
 * Returns { isRateLimited: boolean, needsReset: boolean }
 */
export async function checkWebSearchRateLimit(
  builder: SecretVaultBuilderClient,
  userId: string,
  userCollectionId: string,
): Promise<{
  isRateLimited: boolean;
  needsReset: boolean;
  currentCount: number;
  webSearchData?: { date?: string; counter?: number };
}> {
  try {
    const userResult = await getRecord(builder, userCollectionId, {
      _id: userId,
    });

    if (!userResult.result || userResult.result.length === 0) {
      // User not found, no rate limit
      return {
        isRateLimited: false,
        needsReset: false,
        currentCount: 0,
        webSearchData: undefined,
      };
    }

    const user = userResult.result[0];
    const webSearchData = user.web_search as
      | { date?: string; counter?: number }
      | undefined;
    const webSearchDate = webSearchData?.date;
    const webSearchCounter = webSearchData?.counter;

    // If web_search fields don't exist, initialize them
    if (webSearchDate === undefined || webSearchCounter === undefined) {
      try {
        await updateRecord(
          builder,
          userCollectionId,
          { _id: userId },
          {
            web_search: {
              date: getTodayDateString(),
              counter: 0,
            },
          },
        );
        // Return initialized state
        return {
          isRateLimited: false,
          needsReset: false,
          currentCount: 0,
          webSearchData: { date: getTodayDateString(), counter: 0 },
        };
      } catch (error) {
        console.error(
          `User id "${userId}" couldn't be initialized in nilDB:`,
          error,
        );
        // On error, allow the request (fail open)
        return {
          isRateLimited: false,
          needsReset: false,
          currentCount: 0,
          webSearchData: undefined,
        };
      }
    }

    const currentCount = webSearchCounter || 0;

    // Check if date has passed (needs reset)
    const needsReset = webSearchDate ? !isToday(webSearchDate) : false;

    // If needs reset or no date set, not rate limited
    if (needsReset || !webSearchDate) {
      return {
        isRateLimited: false,
        needsReset,
        currentCount,
        webSearchData,
      };
    }

    // Check if current count has reached limit
    const isRateLimited = currentCount >= WEB_SEARCH_DAILY_LIMIT;

    return {
      isRateLimited,
      needsReset,
      currentCount,
      webSearchData,
    };
  } catch (error) {
    console.error(`User id "${userId}" couldn't be fetched from nilDB:`, error);
    // On error, allow the request (fail open)
    return {
      isRateLimited: false,
      needsReset: false,
      currentCount: 0,
      webSearchData: undefined,
    };
  }
}

/**
 * Reset web search counter for a user (when date has passed)
 */
export async function resetWebSearchCounter(
  builder: SecretVaultBuilderClient,
  userId: string,
  userCollectionId: string,
): Promise<void> {
  try {
    await updateRecord(
      builder,
      userCollectionId,
      { _id: userId },
      {
        web_search: {
          date: getTodayDateString(),
          counter: 0,
        },
      },
    );
  } catch (error) {
    console.error(
      `User id "${userId}" couldn't be updated in nilDB for counter reset:`,
      error,
    );
    // Don't throw - allow the request to proceed
  }
}

/**
 * Increment web search counter for a user
 * Uses the existing user data to avoid extra database reads
 */
export async function incrementWebSearchCounterFromData(
  builder: SecretVaultBuilderClient,
  userId: string,
  userCollectionId: string,
  webSearchData: { date?: string; counter?: number } | undefined,
): Promise<void> {
  try {
    const webSearchDate = webSearchData?.date;

    // If no date or date has passed, reset and set to 1
    if (!webSearchDate || !isToday(webSearchDate)) {
      await updateRecord(
        builder,
        userCollectionId,
        { _id: userId },
        {
          web_search: {
            date: getTodayDateString(),
            counter: 1,
          },
        },
      );
    } else {
      // Increment existing counter using $inc for atomic operation
      await updateRecord(
        builder,
        userCollectionId,
        { _id: userId },
        {
          "web_search.counter": 1,
        },
        "$inc",
      );
    }
  } catch (error) {
    console.error(
      `User id "${userId}" couldn't be updated in nilDB for counter increment:`,
      error,
    );
    // Don't throw - allow the request to proceed without incrementing
  }
}
