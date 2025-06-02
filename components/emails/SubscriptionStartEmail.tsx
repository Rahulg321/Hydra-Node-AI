import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
} from "@react-email/components";

interface SubscriptionStartEmailProps {
  firstName: string | null;
  lastName: string | null;
  email: string;
  subscriptionStartDate: string;
  subscriptionPlan: string;
  dashboardLink: string;
  invoiceLink: string;
}

export default function SubscriptionStartEmail({
  firstName,
  lastName,
  email,
  subscriptionStartDate,
  subscriptionPlan,
  dashboardLink,
  invoiceLink,
}: SubscriptionStartEmailProps) {
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: "Arial, sans-serif",
  };

  const container = {
    margin: "0 auto",
    padding: "20px 0",
    width: "100%",
    maxWidth: "600px",
  };

  const box = {
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  };

  const heading = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
    color: "#333",
  };

  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#333",
    margin: "16px 0",
  };

  const detailsContainer = {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "5px",
    margin: "20px 0",
  };

  const detailsHeading = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
  };

  const detailsText = {
    fontSize: "14px",
    margin: "8px 0",
    color: "#555",
  };

  const button = {
    backgroundColor: "#0070f3",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
    margin: "25px 0",
  };

  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };

  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "22px",
    textAlign: "center" as const,
  };

  const fullName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName
        ? firstName
        : "Valued User";

  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>Hi {fullName},</Text>

            <Text style={paragraph}>
              Fantastic news – your HydraNode subscription is active, and
              you&apos;re all set to crack your certification preparation using
              our GraphRAG based Q&A generation and analysis engine!
            </Text>

            <Text style={paragraph}>
              We&apos;re stoked to be part of your journey.
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
                <strong>Invoice & Receipt:</strong>{" "}
                <Link href={invoiceLink}>View your invoice</Link>
              </Text>
            </Section>

            <Text style={paragraph}>
              Our goal is to help you succeed. If you have any questions or need
              assistance, our support team is ready and waiting. Just reply to
              this message.
            </Text>

            <Text style={paragraph}>
              Let&apos;s crack those certifications together!
            </Text>

            <Text style={paragraph}>
              To your success,
              <br />
              The HydraNode Team <br />
              <Link href="https://hydranode.ai">hydranode.ai</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
