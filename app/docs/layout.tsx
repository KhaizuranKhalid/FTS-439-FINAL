import { generateNavigation, generateSearchData } from "@/lib/markdown";
import { DocsLayout } from "@/components/docs-layout";

export default function DocsLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = generateNavigation();
  const searchData = generateSearchData();

  return (
    <DocsLayout navigation={navigation} searchData={searchData}>
      {children}
    </DocsLayout>
  );
}
