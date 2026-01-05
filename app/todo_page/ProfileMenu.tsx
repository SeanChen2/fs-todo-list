import { Menu, UnstyledButton, Button, Group, Text, Avatar } from "@mantine/core";
import { CiLogout } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { Form } from "react-router";

interface ProfileMenuProps {
  name: string;
}

export function ProfileMenu({ name }: ProfileMenuProps) {
  return (
    <Menu
      width={180}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className="profileMenuButton">
          <Group gap="xs">
            <Avatar radius="xl" size={28}>
              {name[0]}
            </Avatar>

            <Text size="sm" fw={500}>
              {name}
            </Text>

            <FaChevronDown size={14} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Form method="post">
          <Menu.Item
            color="red"
            leftSection={<CiLogout size={16} />}
            type="submit"
          >
          Log out
          </Menu.Item>
          <input type="hidden" name="actionType" value="logOut"></input>
        </Form>
      </Menu.Dropdown>
    </Menu>
  );
}
