import { useState } from "react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { Container, Text, VStack, Heading, Button, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { FaPaintBrush, FaPlus } from "react-icons/fa";
import EventCard from "../components/EventCard";
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
        <SimpleGrid columns={[1, null, 2]} spacing="40px" width="100%">
          {events.map(event => (
            <EventCard key={event.id} event={event} onEdit={() => handleOpenModal(event)} onDelete={() => handleDeleteEvent(event.id)} />
          ))}
        </SimpleGrid>
      </VStack>
      )}
      <EventModal isOpen={isOpen} onClose={onClose} onSave={selectedEvent ? handleEditEvent : handleAddEvent} event={selectedEvent} />
    </Container>
  );
};

export default Index;