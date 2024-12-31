import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import fs from 'fs';
import path from 'path';
export default function page() {
    const filePath = path.join(process.cwd(), './terms.md');
    const terms = fs.readFileSync(filePath, 'utf8');
    return (
        <div className="prose max-w-[100ch] p-2 prose-h2:mt-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {terms}
            </ReactMarkdown>
        </div>
    )
}

