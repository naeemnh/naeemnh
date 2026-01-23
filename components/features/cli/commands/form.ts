import { Command, CLIContext, CommandResult } from "../command-registry";

interface FormState {
  step: "name" | "email" | "subject" | "message" | "submitting" | "done";
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

// Store form state globally (in a real implementation, this would be in CLI state)
let formState: FormState | null = null;

export const createFormCommand = (): Command => ({
  name: "form",
  aliases: [],
  description: "Start interactive contact form",
  usage: "form",
  handler: async (args, context: CLIContext): Promise<CommandResult> => {
    // If form is already in progress and args provided, handle input
    if (formState && formState.step !== "done" && args.length > 0) {
      return await handleFormInput(args, context);
    }

    // If form is in progress but no args, show current prompt
    // This happens when user just runs "form" again or needs to see the prompt
    if (formState && formState.step !== "done") {
      const prompt = getFormPrompt();
      return {
        output: prompt || "Form is in progress. Please enter a value:",
        isTemporaryPrompt: true, // Mark as temporary so it can be removed when user provides input
      };
    }

    // Start new form
    formState = {
      step: "name",
      data: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };

    // Show initial prompt as temporary - it will be removed when user provides input
    // This allows us to show "Name: " first, then replace it with "Name: value\nEmail: "
    const initialOutput = `Contact Form\n\nPlease fill out the following fields:\n\nName: `;

    return {
      output: initialOutput,
      isTemporaryPrompt: true, // Signal to CLI that the last line should be marked as temporary
    };
  },
});

async function handleFormInput(args: string[], context: CLIContext): Promise<CommandResult> {
  if (!formState) {
    formState = null;
    return { error: "Form state lost. Please run 'form' again." };
  }

  const input = args.join(" ").trim();

  switch (formState.step) {
    case "name":
      if (!input) {
        return { error: "Name is required." };
      }
      formState.data.name = input;
      formState.step = "email";
      // Output format: "Name: value\nEmail: " to show value on same "line" as prompt
      // The "Email: " part should be marked as temporary so it can be removed when user provides input
      return {
        output: `Name: ${input}\nEmail: `,
        isTemporaryPrompt: true, // The last line "Email: " is a temporary prompt
      };

    case "email":
      if (!input) {
        return { error: "Email is required." };
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        return { error: "Invalid email format." };
      }
      formState.data.email = input;
      formState.step = "subject";
      // Output format: "Email: value\nSubject: " to show value on same "line" as prompt
      // The "Subject: " part should be marked as temporary so it can be removed when user provides input
      return {
        output: `Email: ${input}\nSubject: `,
        isTemporaryPrompt: true, // The last line "Subject: " is a temporary prompt
      };

    case "subject":
      if (!input) {
        return { error: "Subject is required." };
      }
      formState.data.subject = input;
      formState.step = "message";
      return {
        output: `Subject: ${input}\nMessage: `,
        isTemporaryPrompt: true, // The last line "Message: " is a temporary prompt
      };

    case "message":
      if (!input) {
        return { error: "Message is required." };
      }
      formState.data.message = input;
      formState.step = "submitting";
      return await submitForm(context);

    default:
      formState = null;
      return { error: "Form session expired. Please run 'form' again." };
  }
}

async function submitForm(context: CLIContext): Promise<CommandResult> {
  if (!formState) {
    return { error: "Form data lost. Please run 'form' again." };
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState.data),
    });

    if (response.ok) {
      formState.step = "done";
      const result = {
        output: `Message: ${formState.data.message}\n\nSubmitting...\n\n✓ Message sent successfully!\n\nThank you for reaching out. I'll get back to you soon.`,
      };
      formState = null; // Reset form state
      return result;
    } else {
      formState = null;
      return {
        error: "Failed to send message. Please try again later or use the GUI contact form.",
      };
    }
  } catch (error) {
    formState = null;
    return {
      error: `Error sending message: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// Export function to check if form is in progress
export function isFormInProgress(): boolean {
  return formState !== null && formState.step !== "done";
}

// Export function to get current prompt
export function getFormPrompt(): string | null {
  if (!formState || formState.step === "done") {
    return null;
  }

  switch (formState.step) {
    case "name":
      return "Name: ";
    case "email":
      return "Email: ";
    case "subject":
      return "Subject: ";
    case "message":
      return "Message: ";
    default:
      return null;
  }
}

// Export function to reset form state
export function resetFormState(): void {
  formState = null;
}
