# ChefGPT

Your culinary creativity companion! 

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

1. Node v21.6.2 (or higher)
2. Pnpm v8.15.4 (or higher)
3. [OpenAI Account](https://platform.openai.com/)
4. [OpenAI API Key](https://platform.openai.com/api-keys)
5. [OpenAI Billing Credit](https://platform.openai.com/account/billing/overview) (Suggested amount is $5)

## Overview

An AI chatbot that is a certified jokester! If you are looking for a laugh you came to the right place. JokeGPT will brighten your day with custom jokes personalized to your humor! 

## Installation

1. Install dependencies
    ```bash
    pnpm i
    ```
2. Create `.env`
   ```bash
   cp .env.template .env
   ```
3. Set `OPENAI_API_KEY`

## Usage

Execute the following command to start the service:

```bash
~/Developer/jokegpt [main] $ pnpm dev

> jokegpt@0.1.0 dev
> next dev

   ▲ Next.js 14.1.4
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 1615ms
```

Now, go to http://localhost:3000 to interact with JokeGPT!
