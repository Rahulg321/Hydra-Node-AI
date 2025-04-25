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
  return (
    <Html>
      <Head>
        <title>Welcome to Your Subscription!</title>
      </Head>
      <Preview>
        {firstName && lastName
          ? `Congrats, ${firstName} ${lastName}, your subscription to ${subscriptionPlan} is active!`
          : `Congrats, your subscription to ${subscriptionPlan} is active!`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>🎉 Welcome to Your Subscription! 🎉</Text>
            <Text style={paragraph}>
              {firstName && lastName
                ? `Dear ${firstName} ${lastName},`
                : `Dear Valued User,`}
            </Text>
            <Text style={paragraph}>
              We are excited to let you know that your subscription to{" "}
              <strong>{subscriptionPlan}</strong> is now active!
            </Text>
            <Text style={paragraph}>
              Your subscription started on{" "}
              <strong>{subscriptionStartDate}</strong>.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailsHeading}>Subscription Details:</Text>
              <Text style={detailsText}>
                <strong>Plan:</strong> {subscriptionPlan}
              </Text>
              <Text style={detailsText}>
                <strong>Start Date:</strong> {subscriptionStartDate}
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
