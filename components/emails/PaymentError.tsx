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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

interface PaymentErrorEmailProps {
  customerName: string;
  amount: string;
  currency: string;
  paymentDate: string;
  productName: string;
  supportEmail: string;
}

export default function PaymentErrorEmail({
  customerName,
  amount,
  currency,
  paymentDate,
  productName,
  supportEmail,
}: PaymentErrorEmailProps) {
  return (
    <Html>
      <Head>
        <title>Payment Error</title>
      </Head>
      <Preview>There was an issue with your payment</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Payment Error</Text>
            <Text style={paragraph}>Dear {customerName},</Text>
            <Text style={paragraph}>
              We regret to inform you that there was an issue processing your
              recent payment for {productName}.
            </Text>
            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Payment Details:</Text>
              <Text style={detailsText}>
                Amount: {amount} {currency}
              </Text>
              <Text style={detailsText}>Date: {paymentDate}</Text>
              <Text style={detailsText}>Product: {productName}</Text>
            </Section>
            <Text style={paragraph}>
              Unfortunately, the payment was not successful. This could be due
              to various reasons such as insufficient funds, expired card, or a
              temporary issue with your payment method.
            </Text>
            <Text style={paragraph}>
              To ensure uninterrupted access to {productName}, please review
              your payment information and try again.
            </Text>
            <Button style={button} href={`${baseUrl}/billing`}>
              Update Payment Method
            </Button>
            <Hr style={hr} />
            <Text style={paragraph}>
              If you continue to experience issues or have any questions, please
              don&apos;t hesitate to contact our support team at {supportEmail}.
            </Text>
            <Text style={paragraph}>
              We apologize for any inconvenience this may have caused and
              appreciate your prompt attention to this matter.
            </Text>
            <Text style={paragraph}>Best regards,</Text>
            <Text style={paragraph}>The HydraNode Team</Text>
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
  color: "#d23",
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
