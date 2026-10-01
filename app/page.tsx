import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to Job Designations</h1>
      <p>
        <Link href="/job-designations">Go to Job Designations Form</Link>
      </p>
    </main>
  );
}
