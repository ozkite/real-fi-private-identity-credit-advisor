/**
 * UTM Campaign to Persona Mapping
 * Maps UTM campaign parameters to specific chat personas for automatic selection
 */

export interface UTMPersonaMapping {
  [campaign: string]: string;
}

/**
 * Mapping of UTM campaigns to persona IDs
 * Add new campaigns here as needed
 */
export const UTM_CAMPAIGN_PERSONA_MAPPING: UTMPersonaMapping = {
  relationship_advice_oct25: "relationship-advisor",
  // Add more campaign mappings here in the future
};

/**
 * Gets the persona ID for a given UTM campaign
 * @param campaign - The UTM campaign parameter
 * @returns The persona ID if mapping exists, null otherwise
 */
export function getPersonaForCampaign(campaign: string): string | null {
  return UTM_CAMPAIGN_PERSONA_MAPPING[campaign] || null;
}

/**
 * Gets the persona ID from UTM parameters
 * @param utmParams - UTM parameters object
 * @returns The persona ID if campaign mapping exists, null otherwise
 */
export function getPersonaFromUTM(utmParams: {
  utm_campaign?: string;
}): string | null {
  if (!utmParams.utm_campaign) {
    return null;
  }

  return getPersonaForCampaign(utmParams.utm_campaign);
}
