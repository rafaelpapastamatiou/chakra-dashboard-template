import React, { useMemo } from 'react';
import {
  Box,
  Checkbox,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table as ChakraTable,
  chakra,
  useBreakpointValue,
  VStack,
  Flex,
} from '@chakra-ui/react';

import { useTable, Column, useSortBy } from 'react-table';

import { Pagination } from './Pagination';

type HideColumn = {
  xs?: string[];
  sm?: string[];
  md?: string[];
  lg?: string[];
  xl?: string[];
};

interface TableProps {
  columns: Column<any>[];
  data: any[];
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hideColumnsOnBreak?: HideColumn;
  rowSelection?: any;
  xsColumns?: string[];
}

const breakpointValues = {
  base: { name: 'xs', value: 0 },
  xs: { name: 'xs', value: 0 },
  sm: { name: 'sm', value: 2 },
  md: { name: 'md', value: 3 },
  lg: { name: 'lg', value: 4 },
  xl: { name: 'xl', value: 5 },
};

export function Table({
  columns: columnsRaw,
  data,
  totalCount,
  currentPage,
  setCurrentPage,
  hideColumnsOnBreak,
  rowSelection,
  xsColumns,
}: TableProps): JSX.Element {
  const currentBreakpoint = useBreakpointValue({
    base: breakpointValues['base'].value,
    xs: breakpointValues['xs'].value,
    sm: breakpointValues['sm'].value,
    md: breakpointValues['md'].value,
    lg: breakpointValues['lg'].value,
    xl: breakpointValues['xl'].value,
  });

  const columns = useMemo<Column<any>[]>(() => {
    if (!currentBreakpoint && currentBreakpoint !== 0) return columnsRaw;

    if (currentBreakpoint === 0) {
      if (!xsColumns) return columnsRaw;

      return columnsRaw.filter(
        column =>
          (column.id && xsColumns.includes(column.id)) ||
          (column.accessor && xsColumns.includes(column.accessor.toString())),
      );
    }

    if (!hideColumnsOnBreak) return columnsRaw;

    return columnsRaw.filter(column => {
      const hideColumnKey = Object.keys(hideColumnsOnBreak).find(
        index =>
          (column.accessor &&
            hideColumnsOnBreak[index].includes(column.accessor.toString())) ||
          (column.id &&
            hideColumnsOnBreak[index].includes(column.id?.toString())),
      );

      if (!hideColumnKey) {
        return true;
      }

      if (currentBreakpoint <= breakpointValues[hideColumnKey].value) {
        return false;
      }

      return true;
    });
  }, [columnsRaw, currentBreakpoint, hideColumnsOnBreak]);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <Box>
      {currentBreakpoint > 1 ? (
        <Box overflowX="auto">
          <ChakraTable
            colorScheme="gray"
            variant="simple"
            size="sm"
            maxWidth="100%"
            {...getTableProps()}
          >
            <Thead>
              {headerGroups.map(headerGroup => (
                <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {currentBreakpoint > 2 && rowSelection && (
                    <Th py="4" color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                  )}
                  {headerGroup.headers.map(column => (
                    <Th key={column.id}>
                      {column.render('Header')}
                      <chakra.span pl="4"></chakra.span>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <Tr
                    key={row.id}
                    {...row.getRowProps()}
                    {...(rowIndex % 2 === 0 ? { bg: 'gray.750' } : {})}
                  >
                    {currentBreakpoint > 2 && rowSelection && (
                      <Td textAlign="center">
                        <Checkbox colorScheme="pink" />
                      </Td>
                    )}
                    {row.cells.map(cell => (
                      <Td key={cell.column.id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </ChakraTable>
        </Box>
      ) : (
        <VStack w="full" spacing="4">
          {rows.map(row => {
            prepareRow(row);
            return (
              <VStack
                w="full"
                px={['4', '8']}
                py={['3', '6']}
                bg="gray.750"
                shadow="md"
                direction="column"
                minW={250}
                borderRadius="8"
                key={row.id}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => (
                  <Flex
                    justify="center"
                    key={cell.column.id}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </Flex>
                ))}
              </VStack>
            );
          })}
        </VStack>
      )}
      <Pagination
        totalCountOfRegisters={totalCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        registersPerPage={10}
      />
    </Box>
  );
}
