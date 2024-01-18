import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Props } from "./types";
import { ActionContainer, DescriptionContainer, EditIcon } from "./styles";
import { IconButton } from "../iconButton";

export const TaskListCard = (props: Props) => {
  const { tasks } = props;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {tasks?.map((item) => {
        return (
          <Card key={item.id} variant="outline" size="sm">
            <CardHeader>
              <Heading size="md">{item.name}</Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="4" height="100%">
                <DescriptionContainer>
                  <Text pt="2" fontSize="sm">
                    {item.description}
                  </Text>
                </DescriptionContainer>
                <ActionContainer>
                  <IconButton icon={<EditIcon />} onClick={() => {}} title="" />
                  <IconButton icon={<EditIcon />} onClick={() => {}} title="" />
                </ActionContainer>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </Grid>
  );
};
