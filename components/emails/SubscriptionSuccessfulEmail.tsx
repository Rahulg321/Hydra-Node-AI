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
  email: string;
  subscriptionStartDate: string; // Date when the subscription starts
  subscriptionPlan: string; // Subscription plan name (e.g., "Pro Plan")
  dashboardLink: string; // Link to user's dashboard
}

export default function SubscriptionStartEmail({
  firstName,
  lastName,
  email,
  subscriptionStartDate,
  subscriptionPlan,
  dashboardLink,
}: SubscriptionStartEmailProps) {
  return (
    <Html>
      <Head>
        <title>Your Subscription Has Started</title>
      </Head>
      <Preview>
        {firstName && lastName
          ? `Your ${subscriptionPlan} subscription has started, ${firstName} ${lastName}!`
          : `Your ${subscriptionPlan} subscription has started!`}
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
            <Text style={heading}>Welcome to {subscriptionPlan}!</Text>
            <Text style={paragraph}>
              Hello {firstName} {lastName},
            </Text>
            <Text style={paragraph}>
              We are excited to welcome you to our{" "}
              <strong>{subscriptionPlan}</strong>! Your subscription has
              officially started on <strong>{subscriptionStartDate}</strong>.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Your Subscription Details:</Text>
              <Text style={detailsText}>
                <strong>Subscription Plan:</strong> {subscriptionPlan}
              </Text>
              <Text style={detailsText}>
                <strong>Start Date:</strong> {subscriptionStartDate}
              </Text>
            </Section>

            <Text style={paragraph}>
              To start using all the premium features, you can log in to your
              account using the link below.
            </Text>

            <Button style={button} href={dashboardLink}>
              Go to Your Dashboard
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
