const sampleResponse = {
  happy_path: [
    {
      input: "valid asset_id",
      description: "Soft delete a valid asset",
      output: "Successful soft deletion response",
      mocks: ["mock_db_session", "mock_user_token"],
    },
    {
      input: "existing asset_id",
      description: "Soft delete an existing asset",
      output: "Successful soft deletion response",
      mocks: ["mock_db_session", "mock_user_token"],
    },
    {
      input: "authorized user",
      description: "Soft delete asset with valid user token",
      output: "Successful soft deletion response",
      mocks: ["mock_db_session", "mock_user_token"],
    },
  ],
  edge_case: [
    {
      type: "input validation",
      input: "empty asset_id",
      description: "Attempt soft deletion with empty asset_id",
      output: "Error response for invalid input",
      mocks: ["mock_db_session", "mock_user_token"],
    },
    {
      type: "database error",
      input: "non-existing asset_id",
      description: "Soft delete a non-existing asset",
      output: "Error response for non-existent asset",
      mocks: ["mock_db_session", "mock_user_token"],
    },
    {
      type: "authorization",
      input: "unauthorized user",
      description: "Attempt soft deletion with invalid user token",
      output: "Error response for unauthorized user",
      mocks: ["mock_db_session", "mock_invalid_user_token"],
    },
  ],
};

export async function GET() {
  return new Response(JSON.stringify(sampleResponse));
}
