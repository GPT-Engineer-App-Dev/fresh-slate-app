import { useState } from "react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { Container, Text, VStack, Heading, Button, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { FaPaintBrush, FaPlus } from "react-icons/fa";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import EventModal from "../components/EventModal";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: events, isLoading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEventMutation = useAddEvent();
  const editEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const handleAddEvent = (event) => {
    addEventMutation.mutate(event);
  };

  const handleEditEvent = (updatedEvent) => {
    editEventMutation.mutate(updatedEvent);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEventMutation.mutate(eventId);
  };

  const handleOpenModal = (event = null) => {
    setSelectedEvent(event);
    onOpen();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading events</Text>}
      {!isLoading && !error && (
        <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Your Blank Canvas</Heading>
        <Text fontSize="lg">Start creating your masterpiece with us.</Text>
        <Button leftIcon={<FaPaintBrush />} colorScheme="teal" size="lg">
          Get Started
        </Button>
        <Button leftIcon={<FaPlus />} colorScheme="teal" size="lg" onClick={() => handleOpenModal()}>
          Add Event
        </Button>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Venue ID</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.description}</Td>
                <Td>{event.date}</Td>
                <Td>{event.venue_id}</Td>
                <Td>
                  <Button leftIcon={<FaEdit />} colorScheme="blue" onClick={() => handleOpenModal(event)}>
                    Edit
                  </Button>
                  <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      )}
      <EventModal isOpen={isOpen} onClose={onClose} onSave={selectedEvent ? handleEditEvent : handleAddEvent} event={selectedEvent} />
    </Container>
  );
};

export default Index;