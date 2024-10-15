import { saveAs } from 'file-saver';
import moment from 'moment';
import * as XLSX from 'xlsx';

function detectRowInExcel(paragraph: string) {
  return /^\#/.test(paragraph.trim());
}

function detectCorrectAnswer(paragraph: string) {
  return /^\*\./.test(paragraph.trim());
}

function detectExplain(paragraph: string) {
  return /^\$b\./.test(paragraph.trim());
}

export function SplitParagraphsToObject(paragraphs: string[]) {
  const length = paragraphs.length;
  const questions: string[][] = [];
  let question: string[] = [];
  for (let i = 0; i < length; i++) {
    const paragraph = paragraphs[i];
    if (detectRowInExcel(paragraph)) {
      if (question.length) {
        questions.push(question);
      }
      question = [paragraph];
    } else {
      question.push(paragraph);
    }
  }

  return questions;
}

function arrayToObjectQuestion(questions: string[][]) {
  return questions.map((question) => {
    let obj = {};
    const title = [];
    const correctAnswer = [];
    const other = [];
    const explain: string[] = [];

    question.forEach((item) => {
      if (detectRowInExcel(item)) {
        title.push(item);
      } else if (detectCorrectAnswer(item)) {
        correctAnswer.push(item);
      } else if (detectExplain(item)) {
        explain.push(item);
      } else {
        other.push(item);
      }
      const formattedAnswer: string[] = [];
      if (correctAnswer.length) {
        correctAnswer.forEach((correctA, index) => {
          formattedAnswer.push(correctA);
          formattedAnswer.push(explain?.[index]);
        });
      } else {
        explain.forEach((e) => formattedAnswer.push(e));
      }
      return [...title, ...formattedAnswer.filter((p) => p !== undefined), ...other].forEach((i, idx) => {
        obj[idx] = i;
      });
    });
    return obj;
  });
}

export const exportQuestionsToExcel = (questions: string[][], fileName: string) => {
  const data = arrayToObjectQuestion(questions);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const date = moment().valueOf();
  saveAs(blob, `${fileName}_${date}.xlsx`);
};
