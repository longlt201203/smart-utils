"use client"

import { Collapse, Input, Spacer, Text } from "@geist-ui/core";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { googlecode } from "react-syntax-highlighter/dist/esm/styles/hljs";

const data = [
    {
        key: "mysql-docker-compose",
        label: "MySQL Docker Compose",
        code: "version: '3.9'\nservices:\n    db:\n        container_name: mysql_db\n        image: mysql:8.0\n        ports:\n            - 3306:3306\n        volumes:\n            - db_vol:/var/lib/mysql\n        environment:\n            MYSQL_ROOT_PASSWORD: ...\n            MYSQL_USER: ...\n            MYSQL_PASSWORD: ...\n            MYSQL_ALLOW_EMPTY_PASSWORD: ...\n            MYSQL_RANDOM_ROOT_PASSWORD: ...\n\nvolumes:\n    db_vol:",
        language: "yaml"
    },
    {
        key: "react-docker-nginx-conf",
        label: "NGINX Config for React Dockerfile",
        code: "server {\r\n    listen 80;\r\n    server_name localhost;\r\n\r\n    root /usr/share/nginx/html;\r\n    index index.html;\r\n\r\n    location / {\r\n        try_files $uri $uri/ /index.html;\r\n    }\r\n\r\n    location /static/ {\r\n        alias /usr/share/nginx/html/static/;\r\n    }\r\n\r\n    error_page 404 /index.html;\r\n}",
        language: "properties"
    },
];

export default function CodeHelperPage() {
    const [currentSelect, setCurrentSelect] = useState(data);

    const handleSearch = (search: string) => {
        if (search) {
            setCurrentSelect(data.filter(item => item.key.toLowerCase().includes(search.toLowerCase()) || item.label.toLowerCase().includes(search.toLowerCase())))
        } else {
            setCurrentSelect(data);
        }
    }

    return (
        <div className="w-full">
            <Text h2>Code Helper</Text>
            <Input
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                placeholder="Type to search..."
                width="50%"
                onChange={(e) => handleSearch(e.target.value)} />
            <Spacer h={1} />
            <Collapse.Group>
                {currentSelect.map((item) => (
                    <Collapse key={item.key} title={item.label}>
                        <SyntaxHighlighter language={item.language} style={googlecode} >{item.code}</SyntaxHighlighter>
                    </Collapse>
                ))}
            </Collapse.Group>
        </div>
    );
}