import React from "react";
import { parse } from "papaparse";
import "./App.css";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    // { email: "myemail@gmail.com", name: "Jane Doe" },
  ]);

  return (
    <div>
      <h1 className="text-center text-4xl">Import Your Files Here</h1>
      <div
        className={`p-6 my-5 mx-auto max-w-md border-8 ${
          highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          //console.log(e.dataTransfer.files) - to see what info this event has or to check the file
          setHighlighted(false);

          Array.from(e.dataTransfer.files)

            .filter((file: any) => file.type === "text/csv") //you can validate or filter the type of file accepted
            .forEach(async (file) => {
              // @ts-ignore
              const text = await file.text();
              const result = parse(text, { header: true });
              setContacts((existing: any) => [...existing, ...result.data]);
            });
        }}
      >
        DROP YOUR CSV FILE HERE
      </div>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.email}>
            <strong>{contact.name}</strong>: {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
