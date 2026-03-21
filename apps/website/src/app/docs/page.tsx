"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] as const },
    }),
};

const sections = [
    {
        id: "what-is-nester",
        title: "What is Nester?",
        content: `Nester is a decentralized financial platform that automates crypto savings by diversifying deposits across multiple yield sources and liquidity networks, while enabling instant swaps and fiat settlements (crypto-fiat offramp) — creating a seamless bridge between earning yield and real-world spending.

Think of Nester as the bridge between two worlds. On one side, the powerful but complex world of DeFi where 8–15% yields are possible. On the other side, your everyday life where you need to pay rent in naira, buy groceries in cedis, or send money home in shillings. Nester connects these worlds seamlessly.`,
    },
    {
        id: "savings-layer",
        title: "Pillar 1: Stablecoin Savings Layer",
        content: `The Savings Layer is designed exclusively for stablecoins — USDC, USDT, DAI, and other dollar-pegged assets. When you deposit stablecoins into Nester, your funds enter an intelligent vault system that automatically spreads across multiple proven DeFi lending protocols.`,
        subsections: [
            {
                title: "Conservative Vault",
                description:
                    "Targets 6–8% APY using exclusively time-proven lending protocols. Prioritizes safety above all else — for users who cannot afford any risk to principal.",
            },
            {
                title: "Balanced Vault",
                description:
                    "Aims for 8–11% APY by combining stable lending with carefully selected liquidity pools. The sweet spot between safety and returns, suitable for most users.",
            },
            {
                title: "Growth Vault",
                description:
                    "Targets 11–15% APY by engaging with higher-yielding strategies while maintaining strict risk controls. For users comfortable with slightly higher risk.",
            },
            {
                title: "DeFi500 Vault",
                description:
                    "Operates like an index fund — diversified exposure to top DeFi protocols in a single token (nDEFI). Automatically rebalanced monthly.",
            },
        ],
        footer: `Automated rebalancing continuously monitors every integrated protocol, tracking APYs, liquidity depth, exploit history, and smart contract health. When conditions change, the system acts — migrating funds to better opportunities or reducing exposure to stressed protocols.`,
    },
    {
        id: "yield-layer",
        title: "Pillar 2: Automated Yield Layer",
        content: `Separate from stablecoin savings, the Automated Yield Layer lets you hold and earn on crypto assets like XLM, BTC, ETH, and other tokens. You maintain full price exposure while earning yields on top.

Each asset gets optimized according to its own best available yield opportunities. XLM might be auto-staked + deployed to liquidity pools. BTC gets wrapped and deployed into Bitcoin-backed lending. ETH earns through liquid staking derivatives.

The AI continuously monitors your multi-asset portfolio and suggests rebalancing when allocations drift from optimal ranges.`,
    },
    {
        id: "offramp-layer",
        title: "Pillar 3: Off-Ramp Layer",
        content: `Earning 12% APY is meaningless if you can't use that money. Nester's Off-Ramp Layer solves the last-mile problem with fully automated instant fiat settlement.`,
        steps: [
            "Your crypto is locked in a smart contract escrow",
            "LP Aggregator converts non-stablecoin assets to USDC with minimal slippage",
            "System routes to the optimal liquidity node (pre-funded, bank API integrated)",
            "Banking API automatically initiates fiat transfer — no manual intervention",
            "Same-bank: 3 seconds. Cross-bank: 1–5 minutes",
            "If anything fails — automatic refund from escrow, no delays or disputes",
        ],
        footer: `Liquidity nodes earn 0.5% per transaction and stake collateral to ensure reliability. Supports Nigeria (NGN), Ghana (GHS), and Kenya (KES) with direct banking integrations via Paystack, Moniepoint, and Kuda.`,
    },
    {
        id: "ai-layer",
        title: "Pillar 4: AI Intelligence Layer (Prometheus)",
        content: `Nester's AI doesn't just give you tools — it gives you intelligence. The AI analyzes your portfolio, risk tolerance, and market conditions to deliver personalized, actionable recommendations powered by Claude.`,
        features: [
            {
                name: "Vault Strategy Analyzer",
                desc: 'Ask "I want to save $5,000 with low risk" and get specific vault recommendations with risk-adjusted returns and confidence levels.',
            },
            {
                name: "Portfolio Intelligence",
                desc: "Monitors all your connected wallets — not just Nester deposits. Identifies concentration risks, idle assets, and optimization opportunities.",
            },
            {
                name: "Market Intelligence",
                desc: "Integrates DeFiLlama, CoinGecko, on-chain analytics, and social sentiment to generate weekly market summaries with actionable insights.",
            },
            {
                name: "Conversational Assistant",
                desc: 'Always available in your dashboard. Ask anything — "Should I rebalance?" "Is now a good time to sell XLM?" — and get context-aware answers.',
            },
        ],
        footer: `The AI never executes trades without your permission. It's an advisor, not a custodian. Every recommendation comes with one-click execution buttons that you review and approve.`,
    },
    {
        id: "how-it-works",
        title: "How It All Works Together",
        content: `Imagine you're a freelance developer in Lagos earning $2,000 monthly in USDC:

Month 1 — Deposit into the Balanced Vault. USDC auto-spreads across Aave, Blend, and Kamino at 9.5% APY.

Month 3 — AI suggests diversifying 15% into XLM for growth. You approve. Swap executes instantly at optimal rates.

Month 6 — Need rent money. Click "Withdraw to Bank," enter your GTBank account. Three seconds later, ₦1,565,000 lands in your account.

Month 12 — Portfolio grew from $24,000 to $26,450: stablecoin savings earned $1,950, XLM gained $380 from price appreciation + yields. That's 9.7% effective return with instant liquidity whenever you needed it.`,
    },
    {
        id: "security",
        title: "Security & Transparency",
        content: `Despite all the automation, you maintain complete visibility and control. The Risk & Strategy Dashboard shows exactly where your money is at all times — live APYs, protocol allocation breakdown, earnings over time. You can switch vault strategies or withdraw funds at any time.

Smart contracts are open-source and audited. All on-chain activity is verifiable through Stellar explorers. Non-custodial design means your funds are always under your control.`,
    },
];

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-[120px] pb-20">
                <Container className="max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="mb-12"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
                            Documentation
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Everything you need to understand how Nester works — from
                            stablecoin savings and multi-asset yield to instant fiat
                            off-ramps and AI-powered portfolio intelligence.
                        </p>
                    </motion.div>

                    {/* Table of Contents */}
                    <motion.nav
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={1}
                        className="mb-16 p-6 rounded-2xl border border-border bg-[#fafafa]"
                    >
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            Contents
                        </h2>
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className="text-[15px] text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>

                    {/* Sections */}
                    <div className="space-y-20">
                        {sections.map((section, i) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                variants={fadeUp}
                                custom={0}
                                className="scroll-mt-32"
                            >
                                <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-6">
                                    {section.title}
                                </h2>
                                <div className="text-[15px] leading-relaxed text-foreground/80 whitespace-pre-line mb-6">
                                    {section.content}
                                </div>

                                {/* Vault subsections */}
                                {section.subsections && (
                                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                                        {section.subsections.map((sub) => (
                                            <div
                                                key={sub.title}
                                                className="p-5 rounded-xl border border-border bg-white"
                                            >
                                                <h3 className="font-heading font-semibold text-[15px] mb-2">
                                                    {sub.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {sub.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Off-ramp steps */}
                                {section.steps && (
                                    <div className="mb-6 space-y-3">
                                        {section.steps.map((step, si) => (
                                            <div
                                                key={si}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0D0E1C] text-white text-xs flex items-center justify-center font-medium mt-0.5">
                                                    {si + 1}
                                                </span>
                                                <p className="text-[15px] text-foreground/80">
                                                    {step}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* AI features */}
                                {section.features && (
                                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                                        {section.features.map((feat) => (
                                            <div
                                                key={feat.name}
                                                className="p-5 rounded-xl border border-border bg-white"
                                            >
                                                <h3 className="font-heading font-semibold text-[15px] mb-2">
                                                    {feat.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {feat.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.footer && (
                                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                                        {section.footer}
                                    </p>
                                )}

                                {i < sections.length - 1 && (
                                    <div className="h-px bg-border mt-20" />
                                )}
                            </motion.section>
                        ))}
                    </div>
                </Container>
            </div>
            <Footer />
        </main>
    );
}
