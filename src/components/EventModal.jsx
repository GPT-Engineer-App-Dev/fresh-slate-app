import { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

const EventModal = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venueId, setVenueId] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setVenueId(event.venue_id);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setVenueId("");
    }
  }, [event]);

  const handleSubmit = () => {
    const newEvent = {
      id: event ? event.id : Date.now(),
      title,
      description,
      date,
      venue_id: venueId,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{event ? "Edit Event" : "Add Event"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl id="date" mt={4}>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl id="venueId" mt={4}>
            <FormLabel>Venue ID</FormLabel>
            <Input value={venueId} onChange={(e) => setVenueId(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;