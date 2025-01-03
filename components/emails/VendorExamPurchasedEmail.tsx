import {
    Body,
    Button,
    Head,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";
import { Container } from "@react-email/components";

interface ExamPurchaseEmailProps {
    vendorName: string | null; // Vendor's first name
    vendorEmail: string; // Vendor's email address
    examName: string; // Name of the purchased exam
    purchaseDate: string; // Date when the purchase was made
    examPrice: string; // Price of the exam
    buyerFirstName: string | null; // Buyer's first name (optional)
    buyerLastName: string | null; // Buyer's last name (optional)
}

export default function VendorExamPurchasedEmail({
    vendorName,
    vendorEmail,
    examName,
    purchaseDate,
    examPrice,
    buyerFirstName,
    buyerLastName,
}: ExamPurchaseEmailProps) {
    return (
        <Html>
            <Head>
                <title>Your Exam Was Purchased!</title>
            </Head>
            <Preview>
                {vendorName ? vendorName : ""}! Your exam {examName} was purchased for {examPrice}!
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={box}>
                        <Text style={heading}>💰 Cha-ching! Exam Sale! 💰</Text>
                        <Text style={paragraph}>
                            Great news! Someone just purchased your exam{" "}
                            <strong>{examName}</strong> for <strong>{examPrice}</strong>!
                        </Text>
                        {buyerFirstName && buyerLastName ? (
                            <Text style={paragraph}>
                                The purchase was made by {buyerFirstName} {buyerLastName} on {purchaseDate}.
                            </Text>
                        ) : (
                            <Text style={paragraph}>
                                The purchase was made on {purchaseDate}.
                            </Text>
                        )}

                        <Text style={paragraph}>
                            This is just a notification to let you know about the sale. You can view your earnings and payout details in your vendor dashboard.
                        </Text>

                        <Button style={button} href={`https://hydranode.ai/vendor/dashboard`}>
                            View Your Dashboard
                        </Button>

                        <Text style={footer}>
                            If you have any questions or need assistance, feel free to reply
                            to this email or contact our support team at{" "}
                            <Link href={`mailto:${vendorEmail}`}>{vendorEmail}</Link>.
                        </Text>

                        <Text style={footer}>
                            HydraNode Inc., 123 Tech Street, San Francisco, CA 94122
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// ... (CSS styles remain the same) ...
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
