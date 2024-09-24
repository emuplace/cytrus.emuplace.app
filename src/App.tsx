import "@mantine/core/styles.css";
import {
    Accordion, Anchor, Badge, Button, Container,
    Flex, Group, List, MantineProvider, Menu,
    Space, Stack, Text, Title, rem
} from "@mantine/core";
import {
    IconDeviceMobile,
    IconDeviceTablet,
    IconDeviceLaptop,
} from '@tabler/icons-react';
import { useState } from "react";
import { theme } from "./theme";
import classes from './App.module.css';

export default function App() {
    const changes = [
        {
            text: 'v1.0.0',
            sha: '1e97bb2',
            isLatest: true,
            isUpcoming: false,
            details: [
                {
                    system: "Android",
                    items: [
                        {
                            primaryText: "Rebranded original latest Citra code to Cytrus",
                            secondaryText: null
                        },
                        {
                            primaryText: "Added support for 16 KB page sizes in Android 15",
                            secondaryText: null
                        }
                    ]
                },
                {
                    system: "Windows",
                    items: [
                        {
                            primaryText: "Rebranded original latest Citra code to Cytrus",
                            secondaryText: null
                        }
                    ]
                }
            ]
        }
    ];

    const items = changes.map((item) => {
        const listItems = item.details.map((detail, index) => {
            const detailItems = detail.items.map((item) => (
                <>
                    <List.Item>
                        <Text>{item.primaryText}</Text>
                        <Text c={'dimmed'} size="sm" hidden={item.secondaryText == '' || item.secondaryText == null}>
                            {item.secondaryText}
                        </Text>
                    </List.Item>
                </>
            ));

            return (
                <>
                    <Title order={3}>
                        {detail.system}
                    </Title>
                    <List>
                        {detailItems}
                    </List>
                    <Space h={index === changes.length ? 0 : 'md'} />
                </>
            );
        });

        return (
            <Accordion.Item key={item.text} value={item.text}>
                <Accordion.Control>
                    <Group justify='space-between' pr={'md'}>
                        <Group gap={'sm'}>
                            <Text>
                                {item.text}
                            </Text>
                            <Text c={'dimmed'}>
                                {`(${item.sha})`}
                            </Text>
                        </Group>
                        <Badge color={item.isLatest ? theme.primaryColor : item.isUpcoming ? 'dark' : 'red'}>
                            {item.isLatest ? 'Latest' : item.isUpcoming ? 'Upcoming' : 'Outdated'}
                        </Badge>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                    {...listItems}
                </Accordion.Panel>
            </Accordion.Item>
        );
    });

    const [opened, setOpened] = useState(false);

    const date = new Date();

    return (
        <MantineProvider theme={theme} forceColorScheme={date.getHours() >= 7 && date.getHours() <= 19 ? "light" : "dark"}>
            <Container>
                <Flex align={'center'} justify={'center'} h={'100vh'}>
                    <Stack>
                        <Anchor href='https://twitter.com/antique_codes' ta={'center'} target='_blank'>
                            @antique_codes
                        </Anchor>
                        <Title order={1} ta={'center'}>
                            Cytrus, a Nintendo 3DS emulator
                        </Title>
                        <Text c={'dimmed'} ta={'center'}>
                            Nintendo 3DS emulation, continued
                        </Text>
                        <Flex align={'center'} justify={'center'}>
                            <Group ta={'center'}>
                                <Button component="a" href={`https://github.com/cytrus-emu/cytrus/releases/download/${changes[0].text}/app-nightly-release.apk`} color="green" radius={'xl'} variant="filled">Android</Button>
                                <Menu opened={opened} onChange={setOpened}>
                                    <Menu.Target>
                                        <Button color="blue" radius={'xl'} variant="filled">Apple</Button>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Label>iOS, iPadOS</Menu.Label>
                                        <Menu.Item component="a" href="https://folium.emuplace.app" leftSection={<IconDeviceTablet style={{ width: rem(14), height: rem(14) }} />}>
                                            iPad
                                        </Menu.Item>
                                        <Menu.Item component="a" href="https://folium.emuplace.app" leftSection={<IconDeviceMobile style={{ width: rem(14), height: rem(14) }} />}>
                                            iPhone
                                        </Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Label>macOS</Menu.Label>
                                        <Menu.Item leftSection={<IconDeviceLaptop style={{ width: rem(14), height: rem(14) }} />} disabled>
                                            Apple Silicon
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconDeviceLaptop style={{ width: rem(14), height: rem(14) }} />} disabled>
                                            Intel
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                                <Button color="orange" radius={'xl'} variant="filled" disabled>Linux</Button>
                                <Button color="blue" component="a" href="https://github.com/cytrus-emu/cytrus/releases/download/v1.0.0/cytrus-windows-v1.0.0.7z" radius={'xl'} variant="filled">Windows</Button>
                                <Button color="gray" component="a" href="https://github.com/cytrus-emu/cytrus" radius={'xl'} variant="filled">Source Code</Button>
                            </Group>
                        </Flex>
                        <Space h={'md'} />
                        <Title order={2}>
                            Changes
                        </Title>
                        <Accordion classNames={classes} radius={'md'} variant="contained">
                            {items}
                        </Accordion>
                    </Stack>
                </Flex>
            </Container>
        </MantineProvider>
    );
}
