import type { Topic } from "@prisma/client";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getTopics } from "~/routes/poll/topic.server";
import { createOrUpdateUserWithTopics } from "~/routes/poll/user.server";

export const loader: LoaderFunction = async () => {
  const topics: Topic[] = await getTopics();
  return json({ topics });
};
function isImubitMail(email: string): boolean {
  return email.endsWith("@imubit.com");
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  const { email, ...topics } = values;
  invariant(email, "email is required");
  if (!isImubitMail(email)) {
    return json({ errors: { email: "Must use imubit email" }, values });
  }

  await createOrUpdateUserWithTopics(email, Object.keys(topics));
  return redirect("/poll/thank-you");
};

export default function Index() {
  const data = useLoaderData();
  const transition = useTransition();
  const actionData = useActionData();
  const topics: Topic[] = data.topics;
  const isSubmitting = transition.state === "submitting";
  return (
    <Form method="post">
      <label htmlFor="email">
        Imubit Email: {actionData?.errors?.email}
        <input
          type="email"
          name="email"
          id="email"
          required
          disabled={isSubmitting}
          defaultValue={actionData?.values.email}
        />
      </label>
      <h2>Topics</h2>
      <fieldset id="topics">
        {topics.map((topic) => (
          <div key={topic.id}>
            <label htmlFor={topic.id}>
              {topic.title}
              <input
                type="checkbox"
                name={topic.id}
                id={topic.id}
                disabled={isSubmitting}
                defaultChecked={actionData?.values[topic.id]}
              />
              <p>{topic.body}</p>
            </label>
          </div>
        ))}
      </fieldset>
      <button type="submit">{isSubmitting ? "Saving" : "Save"}</button>
    </Form>
  );
}
