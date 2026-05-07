type SchemaObject = Record<string, unknown>;
type SchemaInput = SchemaObject | SchemaObject[];

export function JsonLd({ id, data }: { id: string; data: SchemaInput }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
