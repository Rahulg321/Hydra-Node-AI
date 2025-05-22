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

interface SubscriptionStartEmailProps {
  firstName: string | null;
  lastName: string | null;
  subscriptionStartDate: string;
  subscriptionPlan: string;
  invoiceLink: string;
}

export default function SubscriptionStartEmail({
  firstName,
  lastName,
  subscriptionStartDate,
  subscriptionPlan,
  invoiceLink,
}: SubscriptionStartEmailProps) {
  const customerName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName || lastName || "there";
  return (
    <Html>
      <Head>
        <title>{`Confirmed! You&#39;re ready to supercharge your certification preparation with HydraNode, ${customerName}!`}</title>
      </Head>
      <Preview>
        {`Confirmed! You&#39;re ready to supercharge your certification preparation with HydraNode, ${customerName}!`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>
              {`Confirmed! You&#39;re ready to supercharge your certification preparation with HydraNode, ${customerName}!`}
            </Text>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Fantastic news – your HydraNode subscription is active, and
              you&#39;re all set to crack your certification preparation using
              our{" "}
              <strong>
                GraphRAG based Q&amp;A generation and analysis engine
              </strong>
              !
            </Text>
            <Text style={paragraph}>
              We&#39;re stoked to be part of your journey.
            </Text>
            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Subscription Details:</Text>
              <Text style={detailsText}>
                <strong>Plan:</strong> {subscriptionPlan}
              </Text>
              <Text style={detailsText}>
                <strong>Active Since:</strong> {subscriptionStartDate}
              </Text>
              <Text style={detailsText}>
                <strong>Invoice &amp; Receipt:</strong>{" "}
                <Link href={invoiceLink}>View your invoice</Link>
              </Text>
            </Section>
            <Text style={paragraph}>
              Our goal is to help you succeed. If you have any questions or need
              assistance, our support team is ready and waiting. Just reply to
              this message.
            </Text>
            <Text style={paragraph}>
              Let&#39;s crack those certifications together!
            </Text>
            <Text style={footer}>
              To your success,
              <br />
              The HydraNode Team
              <Link href="https://hydranode.ai">hydranode.ai</Link>
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

const heading = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const detailsContainer = {
  backgroundColor: "#f4f7fa",
  borderRadius: "4px",
  padding: "24px",
  marginBottom: "24px",
};

const detailsHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const detailsText = {
  margin: "3px 0",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "16px",
};
