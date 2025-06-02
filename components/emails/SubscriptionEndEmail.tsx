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
  subscriptionEndDate: string;
  subscriptionPlan: string;
  renewalLink: string;
}

export default function SubscriptionEndEmail({
  firstName,
  lastName,
  email,
  subscriptionEndDate,
  subscriptionPlan,
  renewalLink,
}: SubscriptionEndEmailProps) {
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "there";

  return (
    <Html>
      <Head>
        <title>Sad to see you go, {firstName}...</title>
      </Head>
      <Preview>Sad to see you go, but is this goodbye for good?</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Sad to see you go, {firstName}...</Text>

            <Text style={paragraph}>Hi {fullName},</Text>

            <Text style={paragraph}>
              We noticed you recently cancelled your HydraNode subscription, and
              honestly, we&apos;re a bit bummed to see you go! We genuinely
              valued having you as part of the HydraNode community.
            </Text>

            <Text style={paragraph}>
              While goodbyes are tough, we&apos;re always striving to improve
              HydraNode. To help us do that, we&apos;d be incredibly grateful if
              you could share a little bit about why you decided to cancel. Your
              honest feedback is like gold to us – it helps us understand what
              we can improve for you and others.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailsHeading}>
                Would you be open to telling us what happened?
              </Text>
              <Text style={detailsText}>
                • Just hit &quot;reply&quot; to this email: Let us know your
                thoughts. No long essays needed (unless you want to!)
              </Text>
              <Text style={detailsText}>
                • Send a note to us – we&apos;re here to listen
              </Text>
            </Section>

            <Text style={paragraph}>Before you go, did you know about:</Text>
            <Text style={paragraph}>
              • &quot;...the recent GraphRAG based Q&A generation that we rolled
              out for even enhanced preparation?&quot;
            </Text>
            <Text style={paragraph}>
              • &quot;...we&apos;re about to launch user behavior analytics that
              many users have been asking for?&quot;
            </Text>

            <Text style={paragraph}>
              We can offer you a 50% discount on our lifetime plan as a valued
              customer.{" "}
              <Link href="mailto:contact@hydranode.ai">Send us an email</Link>{" "}
              to claim your discount. You can easily reactivate your account and
              pick up right where you left off.
            </Text>

            <Button style={button} href={renewalLink}>
              Reactivate Your Account
            </Button>

            <Text style={paragraph}>
              Thanks again for giving HydraNode a try,{" "}
              {firstName ? firstName : ""}. We wish you all the best and hope
              our paths cross again!
            </Text>

            <Text style={paragraph}>
              Warmly,
              <br />
              The HydraNode Team
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
