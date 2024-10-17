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

interface SubscriptionEndEmailProps {
  firstName: string | null;
  lastName: string | null;
  email: string;
  subscriptionEndDate: string; // Date when the subscription ends
  subscriptionPlan: string; // Subscription plan name (e.g., "Pro Plan")
  renewalLink: string; // Link to renew the subscription
}

export default function SubscriptionEndEmail({
  firstName,
  lastName,
  email,
  subscriptionEndDate,
  subscriptionPlan,
  renewalLink,
}: SubscriptionEndEmailProps) {
  return (
    <Html>
      <Head>
        <title>Your Subscription Has Ended</title>
      </Head>
      <Preview>
        {firstName && lastName
          ? "Subscription for {subscriptionPlan} has ended for {firstName} {lastName}"
          : "Subscription for {subscriptionPlan} has ended "}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`/hydranode_logo.png`}
              width="100"
              height="50"
              alt="HydraNode"
              style={logo}
            />
            <Hr style={hr} />
            <Text style={heading}>Subscription Ended</Text>
            <Text style={paragraph}>
              Hello {firstName} {lastName},
            </Text>
            <Text style={paragraph}>
              We wanted to inform you that your subscription to the{" "}
              <strong>{subscriptionPlan}</strong> has ended on{" "}
              <strong>{subscriptionEndDate}</strong>.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Next Steps:</Text>
              <Text style={detailsText}>
                <strong>Subscription Plan:</strong> {subscriptionPlan}
              </Text>
              <Text style={detailsText}>
                <strong>End Date:</strong> {subscriptionEndDate}
              </Text>
            </Section>

            <Text style={paragraph}>
              You can renew your subscription at any time to regain access to
              all the premium features.
            </Text>

            <Button style={button} href={renewalLink}>
              Renew Your Subscription
            </Button>

            <Hr style={hr} />
            <Text style={footer}>
              If you have any questions or need assistance, feel free to reply
              to this email or contact our support team at{" "}
              <Link href={`mailto:${email}`}>{email}</Link>.
            </Text>

            <Hr style={hr} />
            <Text style={footer}>
              HydraNode Inc., 123 Tech Street, San Francisco, CA 94122
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
