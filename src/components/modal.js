
import { Dialog, Button, CloseButton, Portal, Box , ChakraProvider } from '@chakra-ui/react'

import { system } from "@chakra-ui/react/preset";

export const Demo = () => {
    return (
<ChakraProvider value={system}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      </ChakraProvider>
    )
  }