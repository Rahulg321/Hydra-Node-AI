import {
  Body,
  Button,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Container } from "@react-email/components";

interface LifetimeAccessEmailProps {
  firstName: string | null;
  lastName: string | null;
  email: string;
  productName: string; // Product or service name for which the user got lifetime access
  accessStartDate: string; // Date when the lifetime access begins
  dashboardLink: string; // Link to the user dashboard or access area
  invoiceLink: string;
}

export default function LifetimeAccessEmail({
  firstName,
  lastName,
  email,
  productName,
  accessStartDate,
  dashboardLink,
  invoiceLink,
}: LifetimeAccessEmailProps) {
  const customerName =
    firstName && lastName ? `${firstName} ${lastName}` : "Customer";
  return (
    <Html>
      <Head>
        <title>HydraNode Lifetime Subscription Activated!</title>
      </Head>
      <Preview>
        Amazing news – your HydraNode Lifetime Subscription is now active!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Amazing news – your{" "}
              <strong>HydraNode Lifetime Subscription</strong> is now active!
              You&apos;re officially ready to conquer your certification goals
              with our powerful GraphRAG-based Q&amp;A generation and analysis
              engine.
            </Text>
            <Text style={paragraph}>
              We&apos;re thrilled to be your partner on this journey to lifelong
              learning and achievement.
            </Text>
            <Text
              style={{
                ...paragraph,
                fontWeight: "bold",
                marginTop: 24,
                marginBottom: 8,
              }}
            >
              Subscription Details:
            </Text>
            <ul style={ulStyle}>
              <li style={liStyle}>
                <strong>Plan:</strong> Lifetime Access
              </li>
              <li style={liStyle}>
                <strong>Active Since:</strong> {accessStartDate}
              </li>
              <li style={liStyle}>
                <strong>Invoice &amp; Receipt:</strong>{" "}
                <Link href={invoiceLink}>Link to Invoice/Receipt</Link>
              </li>
            </ul>
            <Text style={paragraph}>
              With your lifetime access, you&apos;ll always have HydraNode by
              your side, ready to help you supercharge your preparation for any
              future certification.
            </Text>
            <Text style={paragraph}>
              Do you have questions or need help getting started? Our dedicated
              support team is here for you. Simply reply to this email, and
              we&apos;ll be happy to help.
            </Text>
            <Text style={paragraph}>
              Let&apos;s achieve lifelong certification success, together!
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              To your success,
              <br />
              <br />
              The HydraNode Team
              <Link href="https://www.hydranode.ai">www.hydranode.ai</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const logo = {
  margin: "0 auto",
  marginBottom: "20px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "12px 0",
};

const ulStyle = {
  margin: "0 0 16px 24px",
  padding: 0,
};

const liStyle = {
  marginBottom: "6px",
  fontSize: "16px",
  color: "#525f7f",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "left" as const,
  marginTop: "16px",
};
