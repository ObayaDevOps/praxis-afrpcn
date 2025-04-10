import { Box, useStyleConfig, chakra } from '@chakra-ui/react'; // Make sure chakra is imported if extending Box for animation

// Define the ping animation using Chakra's keyframes utility

// Optional: Create a reusable component
function PingDivider(props) {
  // Or just use the JSX directly where needed

  return (
    // Outer Container div (`divider-container`)
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="-2" // Corresponds to tw--mt-2 (assuming default theme spacing, -0.5rem)
      // className="divider-container" // You can keep custom classNames if needed
      {...props} // Spread any additional props
    >
      {/* Green Dot Container div */}
      <Box
        w="4" // Corresponds to tw-w-4 (1rem)
        h="4" // Corresponds to tw-h-4 (1rem)
        bg="green.500" // Corresponds to tw-bg-green-500
        borderRadius="full" // Corresponds to tw-rounded-full
        position="relative" // Corresponds to tw-relative
        zIndex="10" // Corresponds to tw-z-10
      >
        {/* Inner Animated Dot div */}
        <Box
          w="4" // Corresponds to tw-w-4
          h="4" // Corresponds to tw-h-4
          bg="green.500" // Corresponds to tw-bg-green-500
          borderRadius="full" // Corresponds to tw-rounded-full
          position="relative" // Corresponds to tw-relative (same as parent)
          zIndex="10" // Corresponds to tw-z-10 (same as parent)
        //   animation={pingAnimation} // Apply the defined animation
          // For older Chakra versions or specific needs, you might need:
          // as={chakra.div} // Ensure animation prop works if Box doesn't directly support it
        />
      </Box>

      {/* Vertical Line div */}
      <Box
        w="1" // Corresponds to tw-w-1 (0.25rem)
        h="24" // Corresponds to tw-h-24 (6rem)
        // bg="gray.200" // Corresponds to tw-bg-gray-200 (light mode)
        // _dark={{ bg: 'gray.500' }} // Corresponds to dark:tw-bg-gray-500 (dark mode)
        // Simpler way using semantic tokens if your theme supports them:
        bg={'gray.200'} // Default light mode
        _dark={{
            bg: 'gray.500' // Override for dark mode
        }}
        borderRadius="full" // Corresponds to tw-rounded-full
        mt="-2" // Corresponds to tw--mt-2, pulls it under the dot
      />
    </Box>
  );
}

export default PingDivider;

// How to use it:
// import PingDivider from './PingDivider';
//
// function App() {
//   return (
//     <ChakraProvider> {/* Ensure ChakraProvider wraps your app */}
//       <PingDivider />
//     </ChakraProvider>
//   );
// }