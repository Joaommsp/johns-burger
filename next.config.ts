import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Não gerar AGENTS.md/CLAUDE.md na raiz: são artefatos de ferramenta, não do projeto.
  agentRules: false,
};

export default nextConfig;
