#!/bin/bash
ZIP_NAME="spin-win-pro_full_nextjs_embed.zip"
echo "Creating zip: $ZIP_NAME ..."
zip -r "$ZIP_NAME" . -x "node_modules/*" -x ".git/*"
echo "Zip created: $ZIP_NAME"