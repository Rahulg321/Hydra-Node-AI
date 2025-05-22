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
  return (
    <Html>
      <Head>
        <title>Welcome to Lifetime Access!</title>
      </Head>
      <Preview>
        {firstName && lastName
          ? `Congrats, ${firstName} ${lastName}, you now have Lifetime Access to ${productName}!`
          : `Congrats, you now have Lifetime Access to ${productName}!`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>🎉 Welcome to Lifetime Access! 🎉</Text>
            <Text style={paragraph}>
              {firstName && lastName
                ? `Dear ${firstName} ${lastName},`
                : `Dear Valued User,`}
            </Text>
            <Text style={paragraph}>
              We are beyond thrilled to announce that you now have{" "}
              <strong>LIFETIME ACCESS</strong> to <strong>{productName}</strong>
              !
            </Text>
            <Text style={paragraph}>
              This means no more renewals, no more subscriptions—just pure,
              uninterrupted access to all the premium features, starting from{" "}
              <strong>{accessStartDate}</strong>.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailsHeading}>What&apos;s Next?</Text>
              <Text style={detailsText}>
                <strong>Product Name:</strong> {productName}
              </Text>
              <Text style={detailsText}>
                <strong>Access Start Date:</strong> {accessStartDate}
              </Text>
              <Text style={detailsText}>
                <strong>Invoice:</strong>{" "}
                <Link href={invoiceLink}>View your invoice</Link>
              </Text>
            </Section>

            <Button style={button} href={dashboardLink}>
              Access Your Dashboard
            </Button>

            <Hr style={hr} />
            <Text style={footer}>
              If you have any questions or need assistance, feel free to reply
              to this email or contact our support team at{" "}
              <Link href={`mailto:${email}`}>{email}</Link>.
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
