import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TokenVerificationEmailProps {
  tokenConfirmLink: string;
  firstName?: string | null;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const TokenVerificationEmail: React.FC<
  Readonly<TokenVerificationEmailProps>
> = ({ tokenConfirmLink, firstName }) => (
  <Html>
    <Head />
    <Preview>Almost there! Please verify your email for HydraNode ✨</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/public/hydranode_logo.png`}
            width="120"
            height="36"
            alt="HydraNode"
          />
        </Section>

        <Heading style={h1}>Welcome to HydraNode!</Heading>

        <Text style={heroText}>Hi {firstName || "there"},</Text>

        <Text style={paragraph}>
          Welcome to the HydraNode community! We&apos;re really excited to have
          you join us and can&apos;t wait for you to start preparing for your
          certification exams.
        </Text>

        <Text style={paragraph}>
          Just one quick step before you can dive in: please confirm your email
          address by clicking the button below. This helps us ensure your
          account is secure and you receive all important updates from us.
        </Text>

        <Section style={codeBox}>
          <Link href={tokenConfirmLink} style={buttonLink}>
            Verify Your Email Address
          </Link>
        </Section>

        <Section style={benefitsContainer}>
          <Text style={benefitsHeading}>Why verify?</Text>
          <Text style={benefitsText}>
            • Unlock full access to your new HydraNode account
          </Text>
          <Text style={benefitsText}>
            • Get started with our free certification exams
          </Text>
          <Text style={benefitsText}>
            • Ensure you receive important communications and product updates
          </Text>
        </Section>

        <Text style={paragraph}>
          Having trouble with the button? You can also paste this link into your
          browser:
          <br />
          <Link href={tokenConfirmLink} style={linkText}>
            {tokenConfirmLink}
          </Link>
        </Text>

        <Text style={paragraph}>
          If you have any questions, feel free to contact our support team at{" "}
          <Link href="mailto:contact@hydranode.ai" style={linkText}>
            contact@hydranode.ai
          </Link>
        </Text>

        <Text style={signature}>
          Warmly,
          <br />
          The HydraNode Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default TokenVerificationEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
  maxWidth: "600px",
};

const logoContainer = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
  textAlign: "center" as const,
};

const heroText = {
  fontSize: "24px",
  lineHeight: "32px",
  marginBottom: "20px",
  color: "#1d1c1d",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
  color: "#1d1c1d",
};

const codeBox = {
  background: "#f6f9fc",
  borderRadius: "8px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const buttonLink = {
  fontSize: "18px",
  color: "#ffffff",
  textDecoration: "none",
  backgroundColor: "#0070f3",
  padding: "12px 24px",
  borderRadius: "5px",
  display: "block",
  textAlign: "center" as const,
  fontWeight: "600",
};

const benefitsContainer = {
  marginBottom: "30px",
};

const benefitsHeading = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "12px",
  color: "#1d1c1d",
};

const benefitsText = {
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "8px",
  color: "#1d1c1d",
};

const linkText = {
  color: "#0070f3",
  textDecoration: "underline",
};

const signature = {
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "30px",
  color: "#1d1c1d",
};

const footerSection = {
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid #e6ebf1",
};

const footerLink = {
  color: "#8898aa",
  textDecoration: "underline",
  fontSize: "14px",
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  lineHeight: "15px",
  textAlign: "center" as const,
  marginTop: "20px",
};
