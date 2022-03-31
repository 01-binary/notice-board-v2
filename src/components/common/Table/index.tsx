import React, { FC } from 'react';

interface Column {
  title: string;
  key: string;
}

interface Props {
  data: object[];
  columns: Column[];
  onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

const Table: FC<Props> = ({ data, columns, onClick }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const { title, key } = column;
              return (
                <th
                  className="font-bold text-center bg-[aliceblue] border-b border-solid border-[rgba(0, 0, 0, 0.06)] py-[16px] px-[24px]"
                  key={key}
                >
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((value: any, index: number) => {
            return (
              <tr
                className="cursor-pointer hover:bg-[azure]"
                key={index}
                onClick={onClick}
              >
                {Object.values(value).map((content, innerIndex) => {
                  return (
                    <td
                      className="font-medium text-center border-b border-solid border-[rgba(0, 0, 0, 0.06)] py-[16px] px-[24px]"
                      key={`${index}_${innerIndex}`}
                    >
                      {content as string}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
