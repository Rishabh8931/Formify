import "dotenv/config";

import { eq, and, inArray } from "drizzle-orm";

import { db } from "./index.js";
import { user } from "./schema/auth.js";
import { forms } from "./schema/forms.js";
import { fields } from "./schema/fields.js";
import { fieldAttributes } from "./schema/fieldAttribute.js";

const SEED_USER_EMAIL = process.env.SEED_USER_EMAIL ?? "dev@formify.local";

async function seed() {
  console.log("🌱 Starting database seed...");

  // --------------------------------------------------
  // 1. Find the development user
  // --------------------------------------------------

  const [seedUser] = await db
    .select({
      id: user.id,
      email: user.email,
    })
    .from(user)
    .where(eq(user.email, SEED_USER_EMAIL))
    .limit(1);

  if (!seedUser) {
    throw new Error(
      `Seed user not found: ${SEED_USER_EMAIL}\n` +
        `Create this user first or set SEED_USER_EMAIL to an existing user.`,
    );
  }

  console.log(`👤 Using user: ${seedUser.email}`);

  // --------------------------------------------------
  // 2. Remove previous Formify seed data
  // --------------------------------------------------

  const existingForms = await db
    .select({
      id: forms.id,
    })
    .from(forms)
    .where(eq(forms.userId, seedUser.id));

  const formIds = existingForms.map((form) => form.id);

  if (formIds.length > 0) {
    const existingFields = await db
      .select({
        id: fields.id,
      })
      .from(fields)
      .where(inArray(fields.formId, formIds));

    const fieldIds = existingFields.map((field) => field.id);

    if (fieldIds.length > 0) {
      await db
        .delete(fieldAttributes)
        .where(inArray(fieldAttributes.fieldId, fieldIds));

      await db.delete(fields).where(inArray(fields.id, fieldIds));
    }

    await db.delete(forms).where(inArray(forms.id, formIds));
  }

  console.log("🧹 Removed previous Formify data");

  // --------------------------------------------------
  // 3. Seed forms
  // --------------------------------------------------

  const seededForms = await db
    .insert(forms)
    .values([
      {
        userId: seedUser.id,
        name: "Customer Feedback",
        slug: "customer-feedback",
        description: "Collect feedback from customers about their experience.",
        status: "published",
        settings: {
          submitButtonText: "Submit Feedback",
          successMessage: "Thank you for your valuable feedback!",
        },
      },
      {
        userId: seedUser.id,
        name: "Job Application",
        slug: "job-application",
        description: "Application form for open positions at the company.",
        status: "draft",
        settings: {
          submitButtonText: "Apply Now",
          successMessage: "Your application has been submitted successfully.",
        },
      },
      {
        userId: seedUser.id,
        name: "Event Registration",
        slug: "event-registration",
        description: "Registration form for upcoming company events.",
        status: "published",
        settings: {
          submitButtonText: "Register",
          successMessage: "Your registration has been received.",
        },
      },
      {
        userId: seedUser.id,
        name: "Product Survey",
        slug: "product-survey",
        description: "Understand how users feel about our product.",
        status: "draft",
        settings: {
          submitButtonText: "Submit Survey",
          successMessage: "Thanks for taking the time to complete our survey.",
        },
      },
      {
        userId: seedUser.id,
        name: "Newsletter Signup",
        slug: "newsletter-signup",
        description: "Allow visitors to subscribe to the newsletter.",
        status: "archived",
        settings: {
          submitButtonText: "Subscribe",
          successMessage: "You have been subscribed successfully.",
        },
      },
    ])
    .returning();

  console.log(`📝 Created ${seededForms.length} forms`);

  const customerFeedback = seededForms.find(
    (form) => form.slug === "customer-feedback",
  );

  const jobApplication = seededForms.find(
    (form) => form.slug === "job-application",
  );

  const eventRegistration = seededForms.find(
    (form) => form.slug === "event-registration",
  );

  const productSurvey = seededForms.find(
    (form) => form.slug === "product-survey",
  );

  const newsletterSignup = seededForms.find(
    (form) => form.slug === "newsletter-signup",
  );

  if (
    !customerFeedback ||
    !jobApplication ||
    !eventRegistration ||
    !productSurvey ||
    !newsletterSignup
  ) {
    throw new Error("Failed to create seed forms.");
  }

  // --------------------------------------------------
  // 4. Seed fields
  // --------------------------------------------------

  const seededFields = await db
    .insert(fields)
    .values([
      // ================================================
      // Customer Feedback
      // ================================================

      {
        formId: customerFeedback.id,
        type: "text",
        label: "Name",
        description: "Your full name",
        required: true,
        position: 0,
      },
      {
        formId: customerFeedback.id,
        type: "email",
        label: "Email",
        description: "Your email address",
        required: true,
        position: 1,
      },
      {
        formId: customerFeedback.id,
        type: "rating",
        label: "How would you rate your experience?",
        description: null,
        required: true,
        position: 2,
      },
      {
        formId: customerFeedback.id,
        type: "textarea",
        label: "Additional Feedback",
        description: "Tell us anything else about your experience.",
        required: false,
        position: 3,
      },

      // ================================================
      // Job Application
      // ================================================

      {
        formId: jobApplication.id,
        type: "text",
        label: "Full Name",
        description: null,
        required: true,
        position: 0,
      },
      {
        formId: jobApplication.id,
        type: "email",
        label: "Email Address",
        description: null,
        required: true,
        position: 1,
      },
      {
        formId: jobApplication.id,
        type: "text",
        label: "Phone Number",
        description: null,
        required: true,
        position: 2,
      },
      {
        formId: jobApplication.id,
        type: "file",
        label: "Resume",
        description: "Upload your latest resume.",
        required: true,
        position: 3,
      },
      {
        formId: jobApplication.id,
        type: "textarea",
        label: "Why do you want to join us?",
        description: null,
        required: true,
        position: 4,
      },

      // ================================================
      // Event Registration
      // ================================================

      {
        formId: eventRegistration.id,
        type: "text",
        label: "Full Name",
        description: null,
        required: true,
        position: 0,
      },
      {
        formId: eventRegistration.id,
        type: "email",
        label: "Email",
        description: null,
        required: true,
        position: 1,
      },
      {
        formId: eventRegistration.id,
        type: "select",
        label: "Will you attend?",
        description: null,
        required: true,
        position: 2,
      },
      {
        formId: eventRegistration.id,
        type: "select",
        label: "Dietary Preference",
        description: null,
        required: false,
        position: 3,
      },

      // ================================================
      // Product Survey
      // ================================================

      {
        formId: productSurvey.id,
        type: "text",
        label: "Name",
        description: null,
        required: false,
        position: 0,
      },
      {
        formId: productSurvey.id,
        type: "rating",
        label: "How satisfied are you with our product?",
        description: null,
        required: true,
        position: 1,
      },
      {
        formId: productSurvey.id,
        type: "textarea",
        label: "What can we improve?",
        description: null,
        required: false,
        position: 2,
      },

      // ================================================
      // Newsletter Signup
      // ================================================

      {
        formId: newsletterSignup.id,
        type: "email",
        label: "Email Address",
        description: "Enter your email to receive our newsletter.",
        required: true,
        position: 0,
      },
    ])
    .returning();

  console.log(`🧩 Created ${seededFields.length} fields`);

  // --------------------------------------------------
  // 5. Find fields for attributes
  // --------------------------------------------------

  const field = (formId: string, label: string) =>
    seededFields.find((item) => item.formId === formId && item.label === label);

  const ratingField = field(
    customerFeedback.id,
    "How would you rate your experience?",
  );

  const feedbackEmail = field(customerFeedback.id, "Email");

  const attendanceField = field(eventRegistration.id, "Will you attend?");

  const dietaryField = field(eventRegistration.id, "Dietary Preference");

  const productRatingField = field(
    productSurvey.id,
    "How satisfied are you with our product?",
  );

  const newsletterEmail = field(newsletterSignup.id, "Email Address");

  // --------------------------------------------------
  // 6. Seed field attributes
  // --------------------------------------------------

  const attributeValues = [
    // Customer Feedback - Rating
    ...(ratingField
      ? [
          {
            fieldId: ratingField.id,
            key: "min",
            value: 1,
          },
          {
            fieldId: ratingField.id,
            key: "max",
            value: 5,
          },
          {
            fieldId: ratingField.id,
            key: "step",
            value: 1,
          },
        ]
      : []),

    // Customer Feedback - Email
    ...(feedbackEmail
      ? [
          {
            fieldId: feedbackEmail.id,
            key: "placeholder",
            value: "you@example.com",
          },
        ]
      : []),

    // Event Registration - Attendance
    ...(attendanceField
      ? [
          {
            fieldId: attendanceField.id,
            key: "options",
            value: [
              {
                label: "Yes",
                value: "yes",
              },
              {
                label: "No",
                value: "no",
              },
            ],
          },
        ]
      : []),

    // Event Registration - Dietary
    ...(dietaryField
      ? [
          {
            fieldId: dietaryField.id,
            key: "options",
            value: [
              {
                label: "Vegetarian",
                value: "vegetarian",
              },
              {
                label: "Non-Vegetarian",
                value: "non_vegetarian",
              },
              {
                label: "Vegan",
                value: "vegan",
              },
              {
                label: "Other",
                value: "other",
              },
            ],
          },
        ]
      : []),

    // Product Survey - Rating
    ...(productRatingField
      ? [
          {
            fieldId: productRatingField.id,
            key: "min",
            value: 1,
          },
          {
            fieldId: productRatingField.id,
            key: "max",
            value: 5,
          },
          {
            fieldId: productRatingField.id,
            key: "step",
            value: 1,
          },
        ]
      : []),

    // Newsletter - Email
    ...(newsletterEmail
      ? [
          {
            fieldId: newsletterEmail.id,
            key: "placeholder",
            value: "Enter your email address",
          },
        ]
      : []),
  ];

  if (attributeValues.length > 0) {
    await db.insert(fieldAttributes).values(attributeValues);
  }

  console.log(`⚙️ Created ${attributeValues.length} field attributes`);

  console.log("✅ Database seed completed successfully.");
}

seed()
  .catch((error) => {
    console.error("❌ Database seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$client.end();
  });
