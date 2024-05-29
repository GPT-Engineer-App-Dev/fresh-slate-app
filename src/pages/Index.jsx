import { useState } from "react";
import { Container, Text, VStack, Heading, Button, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { FaPaintBrush, FaPlus } from "react-icons/fa";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleOpenModal = (event = null) => {
    setSelectedEvent(event);
    onOpen();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
      <EventModal isOpen={isOpen} onClose={onClose} onSave={selectedEvent ? handleEditEvent : handleAddEvent} event={selectedEvent} />
    </Container>
  );
};

export default Index;