import React, { ReactNode } from "react";

import { 
  Box, 
  Divider, 
  Spinner,
  Heading,
  SkeletonText,
  SkeletonTextProps,
  Flex
} from "@chakra-ui/react";

interface CardProps {
  title?: 'string' | ReactNode;
  children: ReactNode;
  titleSize?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  skeleton?: SkeletonTextProps;
  isRefreshing?: boolean;
  extra?: ReactNode;
  loadingIndicator?: 'spinner' | 'skeleton';
  fixChartBottomPadding?: boolean;
}

const defaultSkeleton: SkeletonTextProps = {
  noOfLines: 6,
  startColor: 'gray.500',
  endColor: 'gray.700',
  spacing: '5',
}

export function Card({
  title,
  children,
  titleSize = 'md',
  isLoading = false,
  isRefreshing = false,
  skeleton = defaultSkeleton,
  extra,
  loadingIndicator = 'spinner',
  fixChartBottomPadding = false
}: CardProps) {
  return (
    <Flex
      p={['6', '8']}
      {...(fixChartBottomPadding 
        ? {
          pb: ['4', '6']
        } 
        : {})}
      bg='gray.800'
      borderRadius={8}
      boxShadow='md'
      direction='column'
      flex='1'
    >
      {title && (
        <>
          <Flex direction='row' align='center'>
            <Heading size={titleSize} fontWeight='normal'>
              {title}
              {isRefreshing && (
                <Spinner size='sm' color='gray.500' ml='4'/>
              )}
            </Heading>
            {extra && (
              <Box ml='auto'>
                {extra}
              </Box>
            )}
          </Flex>
          <Divider 
            borderColor='gray.600' 
            mb={['4', '6']} 
            mt={['4', '6']} 
          />
        </>
      )}
      <Flex flex='1' direction='column' justify='center'>
        {isLoading 
        ? loadingIndicator === 'spinner'
        ? (
          <Flex justify='center' align='center' flex='1'>
            <Spinner size='xl' color='gray.500'/>
          </Flex>
        )
        : (
          <Box>
            <SkeletonText 
              noOfLines={skeleton.noOfLines}
              startColor={skeleton.startColor}
              endColor={skeleton.endColor}
              spacing={skeleton.spacing} 
            />
          </Box>
        )
         : children}
      </Flex>
    </Flex>
  )
}