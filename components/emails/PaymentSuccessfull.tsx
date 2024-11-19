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

interface PaymentSuccessfulProps {
  customerName: string;
  amount: string;
  currency: string;
  paymentDate: string;
  invoiceNumber: string;
  productName: string;
  invoiceLink: string;
}

export default function PaymentSuccessful({
  customerName,
  amount,
  currency,
  paymentDate,
  invoiceNumber,
  productName,
  invoiceLink,
}: PaymentSuccessfulProps) {
  return (
    <Html>
      <Head>
        <title>Payment Successful</title>
      </Head>
      <Preview>Your payment was successful</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Payment Successful</Text>
            <Text style={paragraph}>Dear {customerName},</Text>
            <Text style={paragraph}>
              Thank you for your payment. We&apos;re pleased to confirm that
              your transaction was successful.
            </Text>
            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Payment Details:</Text>
              <Text style={detailsText}>
                Amount: {amount} {currency}
              </Text>
              <Text style={detailsText}>Date: {paymentDate}</Text>
              <Text style={detailsText}>Invoice Number: {invoiceNumber}</Text>
              <Text style={detailsText}>Product: {productName}</Text>
            </Section>
            <Text style={paragraph}>
              You can view your invoice and manage your subscription from your
              account dashboard.
            </Text>
            <Button style={button} href={invoiceLink}>
              Check Invoice
            </Button>

            <Button style={button} href={`${baseUrl}`}>
              Back to home
            </Button>
            <Hr style={hr} />
            <Text style={paragraph}>
              If you have any questions or concerns about this payment, please
              don&apos;t hesitate to contact our support team.
            </Text>
            <Text style={paragraph}>
              Thank you for choosing HydraNode. We appreciate your business!
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
