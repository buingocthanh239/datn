export type Paragraph = {
  content: string;
  type: number;
  src?: any;
};
export async function extractParagraphFromWord(xml) {
  const paragraphs: string[] = []
  const childBody = xml.getElementsByTagName('w:p')
  for (let i = 0, childLength = childBody.length; i < childLength; i++) {
    paragraphs.push(getComponentInParagraph(childBody[i]))
  }
  return paragraphs;
}

export  function getComponentInParagraph(paragraphsElement) {
  let fullText = '';
  const runComponent = paragraphsElement.getElementsByTagName('w:r');
  for (let i = 0; i < runComponent.length; i++) {
    const runNode = runComponent[i];
    const textComponent = runNode.getElementsByTagName('w:t');
    if (textComponent.length) {
      const textValue = textComponent[0].textContent;
      fullText +=textValue
    }
  }
  return fullText
}