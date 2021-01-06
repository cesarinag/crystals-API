curl 'http://localhost:4741/crystals' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "crystal": {
      "name": "'"${NAME}"'",
      "chakra": "'"${CHAKRA}"'",
      "indigenousTo": "'"${FROM}"'",
      "ritualUse": "'"${USE}"'"
    }
  }'
echo
