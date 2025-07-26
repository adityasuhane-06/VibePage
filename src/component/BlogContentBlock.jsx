import React from 'react'

function BlogContentBlock({ block }) {


  if (!block) {
    return <div>No content block data</div>;
  }

  // Handle different block types
  const renderContent = () => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p 
            className="text-gray-800 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );
      
      case 'header':
        const HeaderTag = `h${block.data.level}`;
        const cleanText = block.data.text
    .replace(/<\/?b>/g, '') // Remove <b> tags
    .replace(/<\/?strong>/g, '') // Remove <strong> tags
    .trim();
        return (
          <HeaderTag 
            className={`font-bold mb-4 ${
              block.data.level === 1 ? 'text-3xl' :
              block.data.level === 2 ? 'text-2xl' :
              block.data.level === 3 ? 'text-xl' : 'text-lg'
            }`}
          >
            {cleanText}
          </HeaderTag>
        );
      
      case 'list':
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';

        // const cleanListText=(text)=>{
        //     return text.replace(/"/g, '').replace(/'/g, '').replace(/<\/?b>/g,'').replace(/<\/?strong>/g, '').trim();

        
        return (
          <ListTag className={`mb-4 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'} pl-6`}>
            {block.data.items.map((item, index) => (
              <li key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: (item.content) }} />
            ))}
          </ListTag>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4 bg-gray-50 py-2">
            <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
            {block.data.caption && (
              <cite className="text-sm text-gray-500 mt-2 block">— {block.data.caption}</cite>
            )}
          </blockquote>
        );
      
      case 'simpleImage':
        return (
          <figure className="mb-6">
            <img 
              src={block.data.url} 
              alt={block.data.caption || 'Blog image'}
              className="w-full rounded-lg shadow-md"
            />
            {block.data.caption && (
              <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );
        case 'image':
        return (
          <figure className="mb-6">
            <img 
              src={block.data.file.url} 
              alt={block.data.caption || 'Blog image'}
              className="w-full rounded-lg shadow-md"
            />
            {block.data.caption && (
              <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );
      
      case 'code':
        return (
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-4">
            <code>{block.data.code}</code>
          </pre>
        );
      
      default:
        console.warn(`Unknown block type: ${block.type}`);
        return (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-yellow-800">Unsupported content type: {block.type}</p>
            <pre className="text-xs mt-2 text-gray-600">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="blog-content-block">
      {renderContent()}
    </div>
  );
}

export default BlogContentBlock;