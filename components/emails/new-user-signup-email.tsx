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

interface NewUserSignupEmailProps {
  name: string;
  dashboardLink: string;
  newUserEmail: string;
}

export default function NewUserSignupEmail({
  name,
  dashboardLink,
  newUserEmail,
}: NewUserSignupEmailProps) {
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

  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "22px",
    textAlign: "center" as const,
  };

  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Welcome to HydraNode!</Text>
            <Text style={paragraph}>
              Hi {name}, {newUserEmail}
            </Text>

            <Text style={paragraph}>
              We&apos;re thrilled to have you join the HydraNode community!
              <br />
              Your account has been created successfully, and you&apos;re now
              ready to start your journey toward certification success.
            </Text>
            <Text style={paragraph}>
              HydraNode empowers you with AI-driven Q&amp;A generation,
              personalized exam prep, and insightful analytics to help you crack
              your certifications with confidence.
            </Text>
            <Button style={button} href={dashboardLink}>
              Go to your Dashboard
            </Button>
            <Text style={paragraph}>
              If you have any questions or need help getting started, just reply
              to this email—our support team is here for you.
            </Text>
            <Text style={paragraph}>
              Wishing you the best on your learning journey!
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
