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
  productName: string;
  accessStartDate: string;
  dashboardLink: string;
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
      <Body style={main}>
        <Container style={container}>
          <Section style={cardBox}>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={headline}>
              🎉 Your <strong>HydraNode Lifetime Subscription</strong> is now
              active!
            </Text>
            <Text style={paragraph}>
              You&apos;re officially ready to conquer your certification goals
              with our powerful GraphRAG-based Q&amp;A generation and analysis
              engine.
            </Text>
            <Text style={paragraph}>
              We&apos;re thrilled to be your partner on this journey to lifelong
              learning and achievement.
            </Text>
            <Section style={detailsSection}>
              <Text style={sectionTitle}>Subscription Details</Text>
              <ul style={ulStyle}>
                <li style={liStyle}>
                  <strong>Plan:</strong> Lifetime Access
                </li>
                <li style={liStyle}>
                  <strong>Active Since:</strong> {accessStartDate}
                </li>
                <li style={liStyle}>
                  <strong>Invoice &amp; Receipt:</strong>{" "}
                  <Link href={invoiceLink} style={linkStyle}>
                    View Invoice/Receipt
                  </Link>
                </li>
              </ul>
            </Section>
            <Section style={{ textAlign: "center", margin: "40px 0 24px" }}>
              <Button href={dashboardLink} style={dashboardButton}>
                Go to Your Dashboard
              </Button>
            </Section>
            <Hr style={hr} />
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
          </Section>
          <Section style={footerSection}>
            <Text style={footerText}>
              To your success,
              <br />
              The HydraNode Team
              <br />
              <Link href="https://www.hydranode.ai" style={footerLink}>
                www.hydranode.ai
              </Link>
            </Text>
            <Text style={supportText}>
              Need help? Contact us at{" "}
              <Link href="mailto:support@hydranode.ai" style={footerLink}>
                support@hydranode.ai
              </Link>
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
  padding: 0,
  margin: 0,
};

const container = {
  backgroundColor: "#f6f9fc",
  margin: "0 auto",
  padding: "0 0 48px",
  minWidth: "100%",
};

const cardBox = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 24px rgba(30, 42, 80, 0.10)",
  padding: "48px 40px 40px 40px",
  margin: "0 auto",
  maxWidth: "520px",
};

const greeting = {
  color: "#1a2233",
  fontSize: "18px",
  fontWeight: 500,
  margin: "0 0 16px 0",
  textAlign: "left" as const,
};

const headline = {
  color: "#2d3a4e",
  fontSize: "24px",
  fontWeight: 700,
  margin: "0 0 24px 0",
  textAlign: "left" as const,
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "28px",
  textAlign: "left" as const,
  margin: "16px 0",
};

const sectionTitle = {
  color: "#1a2233",
  fontSize: "16px",
  fontWeight: 600,
  margin: "32px 0 16px 0",
  textAlign: "left" as const,
  letterSpacing: "0.5px",
};

const detailsSection = {
  margin: "0 0 24px 0",
};

const ulStyle = {
  margin: "0 0 24px 24px",
  padding: 0,
};

const liStyle = {
  marginBottom: "8px",
  fontSize: "16px",
  color: "#525f7f",
};

const linkStyle = {
  color: "#1a7cff",
  textDecoration: "underline",
};

const dashboardButton = {
  backgroundColor: "#1a7cff",
  color: "#fff",
  fontWeight: 600,
  fontSize: "16px",
  borderRadius: "8px",
  padding: "16px 36px",
  border: "none",
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-block",
  margin: "0 auto",
  boxShadow: "0 2px 8px rgba(26,124,255,0.10)",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 0 24px 0",
};

const footerSection = {
  textAlign: "center" as const,
  marginTop: "40px",
  padding: "24px 0 0 0",
};

const footerText = {
  color: "#8898aa",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0 0 12px 0",
};

const supportText = {
  color: "#b0b8c9",
  fontSize: "12px",
  margin: 0,
};

const footerLink = {
  color: "#1a7cff",
  textDecoration: "underline",
};
