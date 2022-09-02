/**
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *          nombre:
 *              type: string
 *              description: Name user
 *          password:
 *              type: string
 *              description: Password user
 *          email:
 *              type: string
 *              description: Password user
 *          role:
 *              type: string
 *              description: Role user
 *      required:
 *          - nombre
 *          - password
 *          - email
 * tags:
 *  - name: [User]
 *    description: CRUD User
 * paths:
 *  /api/users:
 *      get:
 *          tags: [User]
 *          summary: Get all users
 *          responses:
 *              '200':
 *                  description: successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */
