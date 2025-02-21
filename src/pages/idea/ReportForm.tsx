import React, { useEffect, useState } from 'react';

import { AutoResizeTextarea, Button } from '@shared';

import { type reportFormReq, type reportReq, useReport } from '@/hooks/report/ReportApi';
import { useToast } from '@/hooks/use-toast';

interface ParentComponentProps {
  data: reportFormReq | undefined;
  closeMethod: () => void;
}

/* 필요한 정보 : 작성자 닉네임, 제목, targetType, targetId, contents */
const ReportForm = ({ data, closeMethod }: ParentComponentProps) => {
  const reportType = [
    { name: 'Defamation/Abusive Language' },
    { name: 'Fraud' },
    { name: 'Pornographic Content' },
    { name: 'Dissemination of False Information' },
    { name: 'Spam' },
    { name: 'Pump and Dump' },
    { name: 'Solicitation for Meeting' },
    { name: 'Post/Comment Flooding' },
    { name: 'ETC' },
  ];

  const [selectedType, setSelectedType] = useState<string>('');
  const [etcFormView, setEtcFormView] = useState<boolean>(false);
  const [contents, setContents] = useState('');

  const { reportApi } = useReport();
  const { toast } = useToast();

  const handleRadioChange = (type: string) => {
    setSelectedType(type);
  };

  const reportAction = async () => {
    if (contents === '') {
      toast({
        description: '사유를 입력하세요.',
        duration: 2000,
      });
      return;
    }

    if (data) {
      const param: reportReq = {
        targetType: data?.targetType,
        targetId: data?.targetId,
        contents: contents,
      };
      const result = await reportApi(param);

      if (result) {
        closeMethod();
      }
    }
  };

  useEffect(() => {
    if (selectedType === 'ETC') {
      setContents('');
      setEtcFormView(true);
    } else {
      setContents(selectedType);
      setEtcFormView(false);
    }
  }, [etcFormView, selectedType]);

  return (
    <>
      <div className="border-t border-b flex justify-center h-screen sm:h-fit">
        <div>
          <table className="h-4/6">
            <tbody>
              <tr>
                <td>작성자</td>
                <td>{data?.cretName}</td>
              </tr>
              <tr>
                <td>제목</td>
                <td>{data?.title}</td>
              </tr>
              <tr>
                <td rowSpan={10}>사유</td>
              </tr>
              {reportType.map(row => (
                <tr key={row.name}>
                  <td className="text-left">
                    <label>
                      <input type="radio" name="rowSelect" onChange={() => handleRadioChange(row.name)} />
                      <span className="ml-3">{row.name}</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {etcFormView ? <AutoResizeTextarea value={contents} onChange={setContents} /> : null}
          <div className="flex justify-end mt-5">
            <Button onClick={reportAction}>신고</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportForm;
