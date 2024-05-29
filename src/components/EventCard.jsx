import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack spacing={4}>
        <Heading as="h3" size="md">{event.title}</Heading>
        <Text>{event.description}</Text>
        <Button leftIcon={<FaEdit />} colorScheme="blue" onClick={onEdit}>
          Edit
        </Button>
        <Button leftIcon={<FaTrash />} colorScheme="red" onClick={onDelete}>
          Delete
        </Button>
      </VStack>
    </Box>
  );
};

export default EventCard;