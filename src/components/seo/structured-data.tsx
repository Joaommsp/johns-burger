/**
 * Único ponto que injeta JSON-LD na página. O escape de "<" evita que um
 * texto de conteúdo com </script> encerre a tag e quebre o documento.
 */
export function DadosEstruturados({ dados }: { dados: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
      }}
    />
  );
}
