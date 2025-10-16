# 🔐 P.I.C.A. – Private Identity Credit Advisor

> **A RealFi Hackathon Submission** — A privacy-first credit advisor that uses your **Gitcoin Human Passport score as collateral** to unlock instant microloans and grants — **without exposing your identity or raw data**.

Built with:
- **[Gitcoin Human Passport](https://passport.xyz)** for Sybil-resistant, human-verified identity
- **[Nillion SecretAI](https://nillion.com)** for confidential inference (UI inspired by [nilgpt](https://github.com/NillionNetwork/nilgpt))
- **Next.js + RainbowKit** for seamless wallet-connected UX
- **Celo Network** for gas-efficient, mobile-first transactions

---

## 🎯 Vision

In traditional finance, your **credit score** unlocks opportunity.  
In RealFi, your **identity *is* your credit** — but it shouldn’t be public.

**P.I.C.A.** treats your **Human Passport score as a private credit rank**. The higher your score, the more you can borrow — instantly, directly to your wallet — with **zero KYC, zero paperwork, and full privacy**.

> 💡 **Hackathon Context**: Built for the [**RealFi Hack**](https://realfi-hack.devspot.app/en) — bridging DeFi and real-world finance through private identity.

---

## 🔐 How It Works

1. **Connect your wallet** (EVM-compatible via RainbowKit)  
2. **Authenticate with Human Passport** — prove you’re human, not a bot  
3. Your **Passport score** is used as a **confidential credit signal**  
4. Chat with P.I.C.A.:  
   _“Can I get a 0 loan?”_ or _“What grants am I eligible for?”_  
5. Get an instant, personalized response:  
   - ✅ _“Approved: 0 at 5% APY, repay in 30 days”_  
   - 💡 _“You qualify for the RealFi Builder Grant – apply now”_  
6. Funds are sent **directly to your wallet** — no intermediaries  

✅ **No PII stored**  
✅ **No on-chain identity leakage**  
✅ **All logic runs off-chain or via confidential compute (Nillion)**

---

## 🌐 Target Users

- **Web3 Natives**: Stack sats while building  
- **Global South Builders**: Access USD-denominated capital without banks  
- **Freelancers & Creators**: Bridge cash flow gaps instantly  
- **DAO Contributors**: Unlock working capital based on on-chain reputation  
- **Unbanked Individuals**: Use identity as collateral — no credit history needed

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn/ui
- **Wallet**: RainbowKit + Viem
- **Deployment**: Vercel

### Identity & Privacy
- **Human Passport**: Onchain SUMR score via Gitcoin
- **Confidential Compute**: Nillion SecretAI concepts (demo mode)
- **Zero-Knowledge**: Future ZK proofs of score thresholds

### Blockchain
- **Network**: Celo (Mainnet & Alfajores)
- **Stablecoins**: cUSD, cEUR (Mento Protocol)
- **Smart Contracts**: Solidity ^0.8.20 (loan logic, escrow)

### Integrations
- **Human Passport API**: Fetch score securely
- **Nillion SDK**: (Conceptual) for secret inference
- **Safe Global**: (Future) multi-sig loan escrow

---

## 🚀 Local Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Add: NEXT_PUBLIC_PASSPORT_API_KEY, WALLETCONNECT_PROJECT_ID

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏆 RealFi Hackathon

- **Event**: [RealFi Hack – Bridging DeFi & Real-World Finance](https://realfi-hack.devspot.app/en)
- **Goal**: Demonstrate how **private identity** can enable **inclusive, instant credit** in emerging markets
- **Innovation**: First to combine **Human Passport + confidential AI + Celo stablecoins** for microcredit

---

## 📄 License

MIT — because financial inclusion should be open, permissionless, and private.

---

<div align="center">

**Made with 🔐 for the RealFi Hackathon**  
*Your identity is your credit — but it doesn’t have to be public.*

</div>
