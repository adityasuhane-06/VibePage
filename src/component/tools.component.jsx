// Community Tools
import NestedList from '@editorjs/nested-list';
import SimpleImage from '@editorjs/simple-image';
import Personality from '@editorjs/personality';
import Button from 'editorjs-button';
import ColorPlugin from 'editorjs-text-color-plugin';
import AlignmentTool from 'editorjs-text-alignment-blocktune';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import Hyperlink from 'editorjs-hyperlink';
import ToggleBlock from 'editorjs-toggle-block';
import Tooltip from 'editorjs-tooltip';
import Math from 'editorjs-math';
import Mermaid from 'editorjs-mermaid';

// Official Block Tools
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Paragraph from '@editorjs/paragraph';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import LinkTool from '@editorjs/link';
import AttachesTool from '@editorjs/attaches';

// Official Inline Tools
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Underline from '@editorjs/underline';
import uploadImage, { uploadAttachment } from '../common/azure';

import { Toaster, toast } from 'react-hot-toast';



// link ,attachement 




const uploadByFile = async (file) => {
  return new Promise((resolve, reject) => {

     if (!file) {
     
      reject(new Error("No file provided"));
      return;
    }
    if (!file.type.startsWith('image/')) {
      
   
      reject(new Error("Invalid file type"));
      return;
    }
    uploadImage(file)
      .then((url) => {
       
        
        if (url) {
         
          console.log("Uploaded image URL:", url);
          
       
          resolve({
            success: 1,
            file: {
              url: url,
            }
          });
        } else {
         
          reject(new Error("No URL returned"));
        }
      })
      .catch((error) => {
   
        reject(error);
      });
  });
};
const uploadAttachmentByFile = async (file) => {
  let loadingToast = toast.loading("Uploading file...");
  
  try {
 
    if (!file) {
      throw new Error("No file provided");
    }
    

    
    
    const url = await uploadAttachment(file); 
    
    if (!url) {
      throw new Error("No URL returned from upload");
    }
    
    toast.dismiss(loadingToast);
    toast.success("File uploaded successfully");
    console.log("Uploaded file URL:", url);
 
    return {
      success: 1,
      file: {
        url: url,
        size: file.size,
        name: file.name,
        extension: file.name.split('.').pop()
      }
    };
    
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error(error.message || "File upload failed");
    console.error("Upload error:", error);
    
    return {
      success: 0,
      error: error.message
    };
  }
};



export const Tools = {
  // Text Tools
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: 'Enter a header',
      levels: [1,2,3,4,5,6],
      defaultLevel: 3,
      shortcut: 'CMD+SHIFT+H',
    }
  },
  
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  
  // List Tools
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    }
  },
  
  nestedList: {
    class: NestedList,
    config: {
      defaultStyle: 'unordered'
    },
    inlineToolbar: true,
  },
  
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  
  // Media Tools
  image: {
    class: Image,
    config: {
      uploader:{
        
        uploadByFile:uploadByFile,

      }
    }
  },
  
  simpleImage: SimpleImage,
  
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
        codepen: true,
        instagram: true,
        twitter: true,
      }
    }
  },
  
  // Content Tools
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: 'Quote\'s author',
    },
  },
  
  code: {
    class: Code,
    shortcut: 'CMD+SHIFT+C'
  },
  
  math: {
    class: Math,
    config: {
      placeholder: 'Enter a formula'
    }

  },
  
  mermaid: {
    class: Mermaid,
    config: {
      placeholder: 'Enter mermaid code'
    }
  },
  
  // Layout Tools
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  
  delimiter: Delimiter,
  
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+W',
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    }
  },
  
//   ***
  // Interactive Tools
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: 'http://localhost:8008/fetchUrl',
    }
  },
  
  button: {
    class: Button,
    inlineToolbar: false,
    config: {
      css: {
        btnColor: "btn--gray",
      }
    }
  },
  
  toggleBlock: {
    class: ToggleBlock,
    inlineToolbar: true,
  },
  
  // File Tools
  attaches: {
    class: AttachesTool,
    config: {
      uploader: {
        uploadByFile: uploadAttachmentByFile,
      },
  },
},
  
  raw: Raw,
  
  personality: {
    class: Personality,
    config: {
      endpoint: 'http://localhost:8008/uploadFile'
    }
  },
  
  // Inline Tools
  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+C',
  },
  
  underline: Underline,
  
  // Hyperlink (Inline Tool)
  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: 'CMD+L',
      target: '_blank',
      rel: 'nofollow',
      availableTargets: ['_blank', '_self'],
      availableRels: ['author', 'noreferrer'],
      validate: false,
    }
  },
  
  Color: {
    class: ColorPlugin,
    config: {
      colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFC107'],
      defaultColor: '#FF1744',
      type: 'text',
      customPicker: true
    }
  },
  
  // Block Tunes
  anyTuneName: {
    class: AlignmentTool,
    config:{
      default: "left",
      blocks: {
        header: 'center',
        list: 'right'
      }
    },
  }
};

// Initialize drag and drop and undo
export const initializeEditorPlugins = (editor) => {
  new DragDrop(editor);
  new Undo({ editor });
};

// Editor.js configuration with inline toolbar
export const editorConfig = {
  holder: 'editorjs',
  tools: Tools,
  placeholder: 'Let\'s write an awesome story!',
  autofocus: true,
  inlineToolbar: ['marker', 'inlineCode', 'hyperlink', 'underline'],
  // Alternative: inlineToolbar: true (enables all inline tools)
};

export default Tools;