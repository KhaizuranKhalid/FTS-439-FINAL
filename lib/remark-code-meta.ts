import { visit } from "unist-util-visit";

export default function remarkCodeMeta() {
  return (tree: any) => {
    visit(tree, "code", (node: any) => {
      const meta: string | undefined = node.meta || node.metastring;
      if (!meta) return;

      const data = node.data || (node.data = {});
      const hProps = data.hProperties || (data.hProperties = {});

      hProps.metastring = meta;

      const m = meta.match(/\btitle\s*=\s*("([^"]+)"|'([^']+)'|([^\s]+))/);
      if (m) {
        hProps.title = m[2] || m[3] || m[4];
      }
    });
  };
}


