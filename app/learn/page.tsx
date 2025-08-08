
import Link from "next/link";

const items = [
  { title: "Kindergarten Math", url: "https://www.khanacademy.org/math/cc-kindergarten-math" },
  { title: "3rd Grade Math · Fractions", url: "https://www.khanacademy.org/math/cc-third-grade-math" },
  { title: "Reading & Language Arts", url: "https://www.khanacademy.org/ela" },
  { title: "Science · Early Biology", url: "https://www.khanacademy.org/science/biology" },
  { title: "Computing · Hour of Code", url: "https://www.khanacademy.org/computing/hour-of-code" },
];

export const metadata = { title: "Learn · kidschatgpt.org" };

export default function Learn() {
  return (
    <div className="card">
      <h1>Learn with Khan Academy</h1>
      <p>
        Pick a topic. We link you directly to Khan Academy lessons. Everything there is free.
      </p>
      <ul>
        {items.map((x) => (
          <li key={x.url} style={{marginBottom:8}}>
            <Link href={x.url} target="_blank">{x.title}</Link>
          </li>
        ))}
      </ul>
      <p className="small">
        Attribution: All Khan Academy content is free at <a target="_blank" href="https://www.khanacademy.org">https://www.khanacademy.org</a>.
        We do not claim affiliation or endorsement.
      </p>
    </div>
  );
}
